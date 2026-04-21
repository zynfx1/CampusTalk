import express from 'express';
import cors from 'cors';
import authRouter from './routes/authRoutes';
import usersRouter from './routes/usersRoutes';
import cookieParser from 'cookie-parser';
import { doubleCsrfProtection } from './middleware/securityMiddleware';

const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());
app.use(doubleCsrfProtection);
app.use('/api/auth', authRouter);
app.use('/api/user', usersRouter);
const PORT = 3000;

app.listen(PORT, () =>
  console.log(`server is running on http://localhost:${PORT}`),
);
