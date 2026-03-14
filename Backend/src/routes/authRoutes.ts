import { signUp } from 'src/controller/authController';
import { Router } from 'express';

const authRouter = Router();

authRouter.post('/sign-up-user', signUp);
export default authRouter;