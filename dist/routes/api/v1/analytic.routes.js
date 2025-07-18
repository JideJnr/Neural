import express from 'express';
import { verifyJWT } from '../../../middleware/authMiddleware';
import { getAnalyticsOverview } from '../../../controllers/analytics.controller';
const router = express.Router();
router.get('/overview', verifyJWT, getAnalyticsOverview);
export default router;
