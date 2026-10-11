import mongoose from 'mongoose';
// import { seedTeacher } from '../controllers/teacher.controller.ts';

let connectionPromise: Promise<void> | undefined;

export function connectDB(): Promise<void> {
  if (mongoose.connection.readyState === 1) {
    return Promise.resolve();
  }

  if (!connectionPromise) {
    connectionPromise = (async () => {
      const uri = process.env.MONGODB_URI;
      if (!uri) {
        throw new Error('MONGODB_URI is not configured');
      }

      const conn = await mongoose.connect(uri);
      // seedTeacher();
      // console.log('teacher seeded');

      console.log(`MongoDB connected: ${conn.connection.host}`);
    })().finally(() => {
      connectionPromise = undefined;
    });
  }

  return connectionPromise;
}
