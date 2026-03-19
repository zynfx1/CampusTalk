import e, { Request, Response } from 'express';
import pool from '../config/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { strict } from 'assert';

export const signUp = async (req: Request, res: Response) => {
  const { userName, userEmail, userPass } = req.body;

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(userPass, saltRounds);

    const result = await pool.query(
      'INSERT INTO user_table ( user_name, user_email, user_pass) VALUES ($1,$2,$3) RETURNING user_id, user_name, user_email',
      [userName, userEmail, hashedPassword],
    );

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

const signIn = async (req: Request, res: Response) => {
  const { userEmail, userPass } = req.body;

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
    }

    const token = jwt.sign(
      { userId: user.user_id },
      process.env.JWT_SECRET as string,
      { expiresIn: '1hr' },
    );

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
