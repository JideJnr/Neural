import { errorHandler } from '../utils/errorHandler.js';
export const getAnalyticsOverview = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            data: {
            // Add your analytics overview data here
            }
        });
    }
    catch (error) {
        errorHandler(error, req, res);
    }
};
