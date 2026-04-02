import { signUp, signIn, userProfile } from '../controllers/authController';
import { verifyToken } from '../middleware/authMiddleware';
import { Router } from 'express';

const authRouter = Router();

authRouter.post('/sign-up', signUp);
authRouter.post('/sign-in', signIn);

export default authRouter;
