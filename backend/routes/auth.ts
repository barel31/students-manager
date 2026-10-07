import { Router } from 'express';
import jwt from 'jsonwebtoken';

const jwtSecret = 'some_secret_key';

const router = Router();

const users = [{ name: 'admin', id: '123456789' }];

router.post('/login', function (req, res) {
  const { name, id } = req.body;
  const user = users.find(user => user.name === name && user.id === id);
  if (user) {
    const token = jwt.sign({ name }, jwtSecret, { expiresIn: '1m' });
    res.json({ token, user });
  } else {
    res.status(400).json({ message: 'Invalid name or id' });
  }
});

router.post('/verify', function (req, res) {
  const { token } = req.body;
  try {
    const decoded = jwt.verify(token, jwtSecret);
    res.json({ valid: true, decoded });
  } catch (error) {
    res.status(200).json({ valid: false });
  }
});

router.post('/getUser', function (req, res) {
  const { token } = req.body;
  try {
    const decoded = jwt.verify(token, jwtSecret);
    res.json({ valid: true, user: decoded });
  } catch (error) {
    res.status(200).json({ valid: false });
  }
});

export default router;
