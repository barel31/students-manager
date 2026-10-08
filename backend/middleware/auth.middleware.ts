import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { getJwtSecret } from '../config/auth.ts';

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const authorization = req.get('authorization');
  const token = authorization?.startsWith('Bearer ')
    ? authorization.slice('Bearer '.length)
    : undefined;

  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    const payload = jwt.verify(token, getJwtSecret());
    console.log({ payload });
    if (typeof payload === 'string' || typeof payload?.teacherId !== 'string') {
      return res.status(401).json('Invalid token payload');
    }
    req.teacherId = payload.teacherId;
    return next();
  } catch {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}
