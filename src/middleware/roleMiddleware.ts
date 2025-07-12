import { Request, Response, NextFunction } from 'express';

// Extend the Request interface to include user if not already typed
interface AuthenticatedRequest extends Request {
  user?: {
    role: string;
    [key: string]: any; // allow other user fields
  };
}

export const authorizeRoles = (...allowedRoles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Access denied: insufficient permissions' });
    }
    next();
  };
};
