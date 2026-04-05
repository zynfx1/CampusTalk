import { Request, Response } from 'express';
import pool from '../config/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { authRequest } from '../middleware/authMiddleware';

export const signUp = async (req: Request, res: Response) => {
  const { userName, userEmail, userPass } = req.body;
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    return res.status(401).json({ msg: 'Server error configuration' });
  }

  try {
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

    res
      .status(201)
      .json({ msg: 'Successfully created user', res: result.rows });
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
