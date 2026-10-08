import type { Request, Response } from 'express';
import { Teacher } from '../models/teacher.model.ts';

export async function getTeacherStudents(req: Request, res: Response) {
  try {
    // const students = await Teacher.find('')
    // res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ message: 'Error creating student', error });
  }
}

export async function seedTeacher() {
  await Teacher.updateOne(
    { id: '123456789' },
    {
      $setOnInsert: {
        name: 'admin',
        id: '123456789',
        students: [],
      },
    },
    { upsert: true },
  );
}

export async function getTeacher(req: Request, res: Response) {
  const teacherId = req?.teacherId;

  if (!teacherId) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    const teacher = await Teacher.findById(teacherId).exec();

    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    return res.json({ teacher });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch teacher' });
  }
}
