import express from 'express';
import bodyParser from 'body-parser';
import authRouter from './routes/auth.route.ts';
import teacherRouter from './routes/teacher.route.ts';
import studentRouter from './routes/student.route.ts';
import assignmentRouter from './routes/assignment.route.ts';
import { connectDB } from './config/db.ts';
import { loadEnvFile } from 'node:process';
import { existsSync } from 'node:fs';
import cors from 'cors';

if (existsSync('.env')) {
  loadEnvFile();
}

const app = express();

app.use(cors());

app.use(express.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded());

// parse application/json
app.use(bodyParser.json());

app.use(async (_req, _res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    next(error);
  }
});

app.use('/api/auth', authRouter);
app.use('/api/teacher', teacherRouter);
app.use('/api/student', studentRouter);
app.use('/api/assignment', assignmentRouter);

export default app;
