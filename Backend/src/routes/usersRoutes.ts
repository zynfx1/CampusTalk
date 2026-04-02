import { Router } from 'express';
import { verifyToken } from '../middleware/authMiddleware';
import { userProfile } from '../controllers/authController';

const usersRouter = Router();
usersRouter.get('/profile', verifyToken, userProfile);

export default usersRouter;
