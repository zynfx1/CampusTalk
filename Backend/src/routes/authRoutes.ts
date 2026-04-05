import {
  signUp,
  signIn,
  authProfile,
  deleteToken,
} from '../controllers/authController';
import { verifyToken } from '../middleware/authMiddleware';
import { Router } from 'express';

const authRouter = Router();

authRouter.post('/sign-up', signUp);
authRouter.post('/sign-in', signIn);
authRouter.delete('/logout', deleteToken);

export default authRouter;
