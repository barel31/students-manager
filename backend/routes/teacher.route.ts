import { Router } from 'express';
import { getTeacherStudents } from '../controllers/teacher.controller.ts';

const router = Router();

router.get('/', getTeacherStudents);

export default router;
