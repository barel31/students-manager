import type { Request, Response } from 'express';
import { Teacher } from '../models/teacher.model.ts';

export async function createStudent(req: Request, res: Response) {
  const { name, grade, phone } = req.body.student;

  if (!name || !grade || !phone) {
    return res
      .status(400)
      .json({ message: 'Name, grade, and phone are required' });
  }
  try {
    const teacher = await Teacher.findById(req.teacherId).exec();
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    teacher.students.push({ name, grade, phone, assignments: [] });
    await teacher.save();

    console.log('added student:', name, grade, phone);

    return res.status(201).json({
      student: teacher.students[teacher.students.length - 1],
    });
  } catch (error) {
    res.status(400).json({ message: 'Error creating student', error });
  }
}

export async function getStudent(req: Request, res: Response) {
  try {
    const teacher = await Teacher.findById(req.teacherId).exec();
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    const student = teacher.students.find(
      (student: Student) => student._id.toString() === req.params.id,
    );
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    return res.json({ student });
  } catch (error) {
    res.status(400).json({ message: 'Error creating student', error });
  }
}

export async function deleteStudent(req: Request, res: Response) {
  try {
    const teacher = await Teacher.findById(req.teacherId).exec();
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    const studentIndex = teacher.students.findIndex(
      (student: Student) => student._id.toString() === req.params.id,
    );
    if (studentIndex === -1) {
      return res.status(404).json({ message: 'Student not found' });
    }

    teacher.students.splice(studentIndex, 1);
    await teacher.save();

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting student', error });
  }
}
