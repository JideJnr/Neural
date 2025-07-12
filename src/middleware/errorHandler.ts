export const errorHandler = (err, req: Request, res: Response next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, error: err.message || 'Server Error' });
  };
  