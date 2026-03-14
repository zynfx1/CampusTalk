import express from 'express';
import cors from 'cors';
import authRouter from './routes/authRoutes';

const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173',
  }),
);
app.use(express.json());
app.use('/api/auth', authRouter);
const PORT = 3000;

app.listen(PORT, () =>
  console.log(`server is running on http://localhost:${PORT}`),
);
