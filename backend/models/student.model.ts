import { Schema, model } from 'mongoose';
import { assignmentSchema } from './assignment.model.ts';

export const studentSchema = new Schema<Student>({
  name: { type: String, required: true },
  grade: { type: String, required: true },
  phone: { type: String, required: true },
  assignments: { type: [assignmentSchema], default: [] },
});

export const Student = model<Student>('students', studentSchema);
