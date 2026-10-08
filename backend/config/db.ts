import mongoose from 'mongoose';
// import { seedTeacher } from '../controllers/teacher.controller.ts';

export async function connectDB(): Promise<void> {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) throw 'No Mongo DB URI found in env file';

    const conn = await mongoose.connect(uri);
    // seedTeacher();
    // console.log('teacher seeded');

    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error('Database connection failed:', err);
    process.exit(1);
  }
}
