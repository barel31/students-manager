import type { Request, Response } from 'express';
import { Student } from '../models/student.model.ts';

export async function createStudent(req: Request, res: Response) {
  try {
    const student = await Student.create(req.body.student);
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ message: 'Error creating student', error });
  }
}
