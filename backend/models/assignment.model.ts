import { Schema } from 'mongoose';

export const assignmentSchema = new Schema<Assignment>({
  name: { type: String, required: true },
  dueDay: { type: Date, required: true },
  status: { type: Boolean, required: true },
  score: { type: Number, required: true },
});

// export const Assignment = model('assignment', assignmentSchema);
