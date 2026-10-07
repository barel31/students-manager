import express from 'express';
import bodyParser from 'body-parser';
import authRouter from './routes/auth.ts';
import jwt from 'jsonwebtoken';

const PORT = 3001;

// Create Express server
export const app = express();

app.use(express.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded());

// parse application/json
app.use(bodyParser.json());

// Express configuration
app.set('port', PORT);

app.use('/api/status', function (req, res) {
  res.json({ status: 'OK' });
});

app.use('/api/auth', authRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
