import express from 'express';
import bodyParser from 'body-parser';
import authRouter from './routes/auth.route.ts';
import teacherRouter from './routes/teacher.route.ts';
import studentRouter from './routes/student.route.ts';
import { connectDB } from './config/db.ts';
import { loadEnvFile } from 'node:process';
import cors from 'cors';

// Loads environment variables from the default .env file
loadEnvFile();

const PORT = 3001;

// Create Express server
export const app = express();

app.use(cors());

app.use(express.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded());

// parse application/json
app.use(bodyParser.json());

// Express configuration
app.set('port', PORT);

// Routes
app.use('/api/auth', authRouter);
app.use('/api/teacher', teacherRouter);
app.use('/api/student', studentRouter);

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is running on port ${PORT}`);
});
