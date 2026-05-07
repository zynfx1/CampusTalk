import { Request, Response } from 'express';
import pool from '../config/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { authRequest } from '../middleware/authMiddleware';
import { otpTemplate } from '../templates/emailTemplates';
import {
  generateCsrfToken,
  invalidCsrfTokenError,
} from '../middleware/securityMiddleware';
import nodemailer from 'nodemailer';
import crypto from 'node:crypto';
import validator from 'validator';
import disposableEmail from 'disposable-email-domains';
import dns from 'dns';
import { promisify } from 'node:util';

export const signUp = async (req: Request, res: Response) => {
  const { userName, userEmail, userPass, otpCode } = req.body;
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    return res.status(401).json({ msg: 'Server error configuration' });
  }

  try {
    const otpResult = await pool.query(
      'SELECT * FROM otp_table WHERE user_email = $1 AND otp_code = $2 AND expires_at > NOW()',
      [userEmail, otpCode],
    );

    if (otpResult.rows.length === 0) {
      return res.status(400).json({ msg: 'Invalid OTP code' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(userPass, saltRounds);

    const result = await pool.query(
      'INSERT INTO user_table ( user_name, user_email, user_pass) VALUES ($1,$2,$3) RETURNING user_id, user_name, user_email',
      [userName, userEmail, hashedPassword],
    );

    const user = result.rows[0];

    if (!user) {
      return res.status(500).json({ msg: 'Failed to create user account' });
    }

    const token = jwt.sign({ userId: user.user_id }, jwtSecret, {
      expiresIn: '1h',
    });

    res.cookie('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600000,
    });

    await pool.query('DELETE FROM otp_table WHERE user_email = $1', [
      userEmail,
    ]);

    res.status(201).json({ msg: 'Successfully created user', res: user });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ msg: 'Failed to register user account in database' });
  }
};

export const signIn = async (req: Request, res: Response) => {
  const { userEmail, userPass } = req.body;
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    console.error('JWT Secret is missing');
    return res.status(401).json({ msg: 'Server error configuration' });
  }

  try {
    const result = await pool.query(
      'SELECT * FROM user_table WHERE user_email = $1',
      [userEmail],
    );
    const user = result.rows[0];

    if (!user) {
      res.status(401).json({ msg: 'Invalid Credentials' });
      return;
    }

    const isMatch = await bcrypt.compare(userPass, user.user_pass);

    if (!isMatch) {
      res.status(401).json({ msg: 'Invalid Credentials' });
      return;
    }

    const token = jwt.sign({ userId: user.user_id }, jwtSecret, {
      expiresIn: '1h',
    });

    res.cookie('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600000,
    });

    res.status(200).json({
      msg: 'Successfully logged in',
      user: { id: user.user_id, email: user.user_email },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error during log in' });
  }
};

export const csrfVerification = async (req: Request, res: Response) => {
  const csrfToken = generateCsrfToken(req, res);

  try {
    res
      .status(200)
      .json({ msg: 'CSRF Token generated successfully', csrfToken: csrfToken });
  } catch (error) {
    invalidCsrfTokenError;
    res.status(500).json({ msg: 'Failed to generate CSRF Token' });
  }
};

export const authProfile = async (req: authRequest, res: Response) => {
  const userId = req.userId;

  try {
    const result = await pool.query(
      'SELECT * FROM user_table WHERE user_id = $1',
      [userId],
    );
    const user = result.rows[0];

    res.status(200).json({
      msg: 'User profile fetched successfully',
      res: { email: user.user_email },
    });
  } catch (error) {
    res.status(500).json({ msg: 'Failed to fetch user profile' });
  }
};

export const deleteToken = async (req: Request, res: Response) => {
  try {
    res.clearCookie('auth_token');
    res.status(200).json({ msg: 'Successfully logged out' });
  } catch (error) {
    res.status(500).json({ msg: 'Failed to log out' });
  }
};

export const sendOtp = async (req: Request, res: Response) => {
  const { userName, userEmail } = req.body;
  const resolveMx = promisify(dns.resolveMx);

  if (!userEmail || !validator.isEmail(userEmail)) {
    return res.status(400).json({ msg: 'INVALID_EMAIL' });
  }

  const allowedDomains = [
    //Big Four
    'gmail.com',
    'googlemail.com',
    'hotmail.com',
    'outlook.com',
    'live.com',
    'msn.com',
    'yahoo.com',
    'ymail.com',
    'icloud.com',
    'me.com',
    'appleid.com',
    //Professional & Privacy Providers
    'proton.me',
    'protonmail.com',
    'zoho.com',
    'aol.com',
    'gmx.com',
    'mail.com',
    //Edu
    'yourcollege.edu',
  ];
  const domain = userEmail.split('@')[1];

  if (!allowedDomains.includes(domain) || disposableEmail.includes(domain)) {
    return res.status(400).json({ msg: 'INVALID_EMAIL' });
  }
  try {
    const userNameExists = await pool.query(
      'SELECT * FROM user_table WHERE user_name = $1',
      [userName],
    );

    const userEmailExists = await pool.query(
      'SELECT * FROM user_table WHERE user_email = $1',
      [userEmail],
    );

    if (userNameExists.rows.length > 0) {
      console.log('USERNAME_TAKEN');
      return res.status(400).json({ msg: 'USERNAME_TAKEN' });
    }

    if (userEmailExists.rows.length > 0) {
      console.log('EMAIL_TAKEN');
      return res.status(400).json({ msg: 'EMAIL_TAKEN' });
    }

    const mxRecords = await resolveMx(domain);
    if (mxRecords.length === 0) {
      return res.status(400).json({ msg: 'INVALID_EMAIL' });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASS,
      },
    });

    const otp = crypto.randomInt(100000, 999999).toString();
    const expires_at = new Date(Date.now() + 5 * 60000);

    await pool.query('DELETE FROM otp_table WHERE user_email = $1', [
      userEmail,
    ]);
    await pool.query(
      'INSERT INTO otp_table (user_email, otp_code, expires_at) VALUES ($1, $2, $3) RETURNING user_email',
      [userEmail, otp, expires_at],
    );

    await transporter.sendMail({
      from: `"CampusTalk" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: 'Your CampusTalk Verification Code',
      html: otpTemplate(otp, userName),
    });

    console.log(`OTP send successfully to ${userEmail}: ${otp}`);
    res.status(200).json({ msg: 'OTP send successfully', email: userEmail });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Failed to send OTP' });
  }
};
