export const authorizeRoles = (...allowedRoles) => {
    return (req: Request, res: Response next) => {
      if (!req.user || !allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ error: 'Access denied: insufficient permissions' });
      }
      next();
    };
  };
  