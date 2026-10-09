import { Router } from 'express';
import { getTeacherStudents } from '../controllers/teacher.controller.ts';
import { requireAuth } from '../middleware/auth.middleware.ts';

const router = Router();

router.get('/students', requireAuth, getTeacherStudents);

export default router;
