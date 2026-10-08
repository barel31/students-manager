import { Router } from 'express';
import { createStudent } from '../controllers/student.controller.ts';
import { requireAuth } from '../middleware/auth.middleware.ts';

const router = Router();

router.get('/createStudent', requireAuth, createStudent);

export default router;
