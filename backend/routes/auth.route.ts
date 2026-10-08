import { Router } from 'express';
import { loginTeacher, verifyTeacher } from '../controllers/auth.controller.ts';
import { requireAuth } from '../middleware/auth.middleware.ts';
import { getTeacher } from '../controllers/teacher.controller.ts';

const router = Router();


router.post('/login', loginTeacher);
router.post('/verify', verifyTeacher);
router.get('/getTeacher', requireAuth, getTeacher)

export default router;
