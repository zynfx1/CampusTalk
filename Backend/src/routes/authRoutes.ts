import { signUp } from '../controllers/authController';
import { Router } from 'express';

const authRouter = Router();

authRouter.post('/sign-up', signUp);
authRouter.post('/')
export default authRouter;
