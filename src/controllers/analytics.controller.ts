import { errorHandler } from '../utils/errorHandler.js';
import { Request, Response } from 'express';

export const getAnalyticsOverview = async (req: Request, res: Response) => {
    try {

      res.status(200).json({
        success: true,
        data: {
          // Add your analytics overview data here
        }
  
      });
    } catch (error) {
      errorHandler(error, req, res);
    }
}
