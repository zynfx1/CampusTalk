import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface authRequest extends Request {
  userId?: string;
}

export const verifyToken = (
  req: authRequest,
  res: Response,
  next: NextFunction,
) => {
  const jwtSecret = process.env.JWT_SECRET;
  const token = req.cookies.auth_token;

  if (!jwtSecret) {
    console.error('JWT Secret is missing');
    return res.status(401).json({ msg: 'Server error configuration' });
  }

  if (!token) {
    console.error('Access Denied: No Token Provided');
    return res.status(401).json({ msg: 'Access Denied: No Token Provided' });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret) as { userId: string };
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error(error);
    res.status(403).json({ msg: 'Invalid or expired token' });
  }
};
