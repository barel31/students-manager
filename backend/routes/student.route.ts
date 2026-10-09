import { Router } from 'express';
import {
  createStudent,
  deleteStudent,
  getStudent,
} from '../controllers/student.controller.ts';
import { requireAuth } from '../middleware/auth.middleware.ts';

const router = Router();

router.get('/:id', requireAuth, getStudent);
router.delete('/:id', requireAuth, deleteStudent);
router.post('/createStudent', requireAuth, createStudent);

export default router;
