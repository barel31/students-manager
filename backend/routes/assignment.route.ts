import { Router } from 'express';
import {
  addAssignment,
  deleteAssignment,
  updateAssignment,
} from '../controllers/assignment.controller.ts';
import { requireAuth } from '../middleware/auth.middleware.ts';

const router = Router();

router.post('/:studentId', requireAuth, addAssignment);
router.delete('/:studentId', requireAuth, deleteAssignment);
router.patch('/:studentId/:assignmentId', requireAuth, updateAssignment);

export default router;
