import { Schema, model } from 'mongoose';
import { studentSchema } from './student.model.ts';

export const teacherSchema = new Schema<Teacher>(
  {
    name: { type: String, required: true },
    id: { type: String, required: true, unique: true },
    students: { type: [studentSchema], required: true },
  },
  { timestamps: true },
);

export const Teacher = model('teacher', teacherSchema);
