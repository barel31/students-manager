import { Router } from 'express';
import {
  addAssignment,
  createStudent,
  deleteAssignment,
  deleteStudent,
  getStudent,
} from '../controllers/student.controller.ts';
import { requireAuth } from '../middleware/auth.middleware.ts';

const router = Router();

router.get('/:studentId', requireAuth, getStudent);
router.delete('/:studentId', requireAuth, deleteStudent);
router.post('/student', requireAuth, createStudent);
router.post('/:studentId/assignment', requireAuth, addAssignment);
router.delete('/:studentId/assignment', requireAuth, deleteAssignment);

export default router;
