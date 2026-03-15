import { Request, Response } from 'express';
import pool from '../config/db';
import bcrypt from 'bcrypt';

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
