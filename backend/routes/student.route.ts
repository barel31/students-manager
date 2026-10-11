import { Router } from 'express';
import {
  createStudent,
  deleteStudent,
  getStudent,
  updateStudent,
} from '../controllers/student.controller.ts';
import { requireAuth } from '../middleware/auth.middleware.ts';

const router = Router();

router.get('/:studentId', requireAuth, getStudent);
router.delete('/:studentId', requireAuth, deleteStudent);
router.patch('/:studentId', requireAuth, updateStudent);
router.post('/student', requireAuth, createStudent);

export default router;
