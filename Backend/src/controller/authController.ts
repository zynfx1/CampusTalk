import { Request, Response } from 'express';
import pool from 'src/config/db';
import bcrypt from 'bcrypt';

export const signUp = async (res: Response, req: Request) => {
  const { id, user_name, user_email, user_pass } = req.body;

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(user_pass, saltRounds);

    const result = await pool.query(
      'INSERT INTO user_table (user_name,user_email,user_pass) VALUES ($1,$2,$3) RETURNING id,user_name,user_email',
      [user_name, user_email, hashedPassword],
    );

    res.status(201).json({ msg: 'Successfully created user', res: result });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ msg: 'Failed to register user account in database' });
  }
};
