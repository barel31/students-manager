import express from 'express';
import bodyParser from 'body-parser';

// Routes
// import { index } from './routes/index';

// Create Express server
export const app = express();

app.use(express.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded());

// parse application/json
app.use(bodyParser.json());

// Express configuration
app.set('port', process.env.PORT || 3001);

app.use('/api/status', function (req, res, next) {
  res.json({ status: 'OK' });
});

app.post('/api/login', function (req, res, next) {
  const { name, id } = req.body;
    if (name && id) {
        res.json({ message: 'Login successful' });
    } else {
        res.status(400).json({ message: 'Missing name or id' });
    }
});

app.listen(app.get('port'), () => {
  console.log(`Server is running on port ${app.get('port')}`);
});
