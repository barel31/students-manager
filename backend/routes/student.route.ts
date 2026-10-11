import { Router } from 'express';
import {
  addAssignment,
  createStudent,
  deleteAssignment,
  deleteStudent,
  getStudent,
  updateAssignment,
  updateStudent,
} from '../controllers/student.controller.ts';
import { requireAuth } from '../middleware/auth.middleware.ts';

const router = Router();

router.get('/:studentId', requireAuth, getStudent);
router.delete('/:studentId', requireAuth, deleteStudent);
router.patch('/:studentId', requireAuth, updateStudent);
router.post('/student', requireAuth, createStudent);
router.post('/:studentId/assignment', requireAuth, addAssignment);
router.delete('/:studentId/assignment', requireAuth, deleteAssignment);
router.patch(
  '/:studentId/assignment/:assignmentId',
  requireAuth,
  updateAssignment,
);

export default router;
