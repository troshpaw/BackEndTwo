import express from 'express';
import { usersRouter } from "./routes/usersRoutes";
import { authRouter } from "./routes/authRoutes";
import {feedbacksRouter} from "./routes/feedbacksRoutes";

export const app = express();

const jsonBodyMiddleware = express.json();
app.use(jsonBodyMiddleware);

app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/feedbacks', feedbacksRouter);