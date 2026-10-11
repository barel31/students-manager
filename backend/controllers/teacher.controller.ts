import type { Request, Response } from 'express';
import { Teacher } from '../models/teacher.model.ts';

export async function getTeacherStudents(req: Request, res: Response) {
  const teacherId = req.teacherId;
  try {
    const teacher = await Teacher.findById(teacherId).exec();

    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    return res.json({ students: teacher.students });
  } catch (error) {
    console.error('Error fetching teacher students:', error);
    return res.status(500).json({ message: 'Failed to fetch students' });
  }
}

// export async function seedTeacher() {
//   await Teacher.updateOne(
//     { id: '123456789' },
//     {
//       $setOnInsert: {
//         name: 'admin',
//         id: '123456789',
//         students: [],
//       },
//     },
//     { upsert: true },
//   );
// }

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
