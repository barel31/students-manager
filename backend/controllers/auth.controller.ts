import type { Request, Response } from 'express';
import { getJwtSecret } from '../config/auth.ts';
import jwt from 'jsonwebtoken';
import { Teacher } from '../models/teacher.model.ts';

export async function loginTeacher(req: Request, res: Response) {
  try {
    const { name, id } = req.body;
    const teacher = await Teacher.findOne({ name, id }).exec();
    if (teacher) {
      const token = jwt.sign(
        { teacherId: teacher._id.toString() },
        getJwtSecret(),
        { expiresIn: '7d' },
      );
      res.json({ token, teacher });
    } else {
      res.status(401).json({ message: 'Invalid name or id' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Bad request' });
  }
}

export async function verifyTeacher(req: Request, res: Response) {
  try {
    const { token } = req.body;
    const decoded = jwt.verify(token, getJwtSecret());
    res.json({ valid: true, decoded });
  } catch (error) {
    res.status(200).json({ valid: false });
  }
}
