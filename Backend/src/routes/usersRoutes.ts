import { Router } from 'express';
import { verifyToken } from '../middleware/authMiddleware';
import { authProfile } from '../controllers/authController';

const usersRouter = Router();
usersRouter.get('/profile', verifyToken, authProfile);

export default usersRouter;
