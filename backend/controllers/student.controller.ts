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

    return res.status(201).json({
      student: teacher.students[teacher.students.length - 1],
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating student', error });
  }
}

export async function getStudent(req: Request, res: Response) {
  try {
    const teacher = await Teacher.findById(req.teacherId).exec();
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    const student = teacher.students.find(
      (student: Student) => student._id.toString() === req.params.studentId,
    );
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    return res.json({ student });
  } catch (error) {
    res.status(500).json({ message: 'Error creating student', error });
  }
}

export async function deleteStudent(req: Request, res: Response) {
  try {
    const teacher = await Teacher.findById(req.teacherId).exec();
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    const studentIndex = teacher.students.findIndex(
      (student: Student) => student._id.toString() === req.params.studentId,
    );
    if (studentIndex === -1) {
      return res.status(404).json({ message: 'Student not found' });
    }

    teacher.students.splice(studentIndex, 1);
    await teacher.save();

    return res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: 'Error deleting student', error });
  }
}

function isStudentField(field: unknown): field is 'name' | 'grade' | 'phone' {
  return field === 'name' || field === 'grade' || field === 'phone';
}

export async function updateStudent(req: Request, res: Response) {
  const { field, value } = req.body as { field?: unknown; value?: unknown };

  if (!isStudentField(field) || typeof value !== 'string' || !value.trim()) {
    return res.status(400).json({ message: 'Invalid student details' });
  }

  try {
    const teacher = await Teacher.findById(req.teacherId).exec();
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    const student = teacher.students.find(
      (item: Student) => item._id.toString() === req.params.studentId,
    );
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    student[field] = value.trim();
    await teacher.save();
    return res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: 'Error updating student', error });
  }
}
