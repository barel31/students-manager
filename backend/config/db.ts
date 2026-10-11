import mongoose from 'mongoose';
// import { seedTeacher } from '../controllers/teacher.controller.ts';

export async function connectDB(): Promise<void> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI not found in env file');
  }

  const conn = await mongoose.connect(uri);
  // seedTeacher();
  // console.log('teacher seeded');

  console.log(`MongoDB connected: ${conn.connection.host}`);
}
