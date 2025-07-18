import express from 'express';
import { verifyJWT } from '../../../middleware/authMiddleware';
import { getAllLiveMatches, getAllMatchesByDate, getMatchById, getMatchVerdicts } from '../../../controllers/match.controller';
const router = express.Router();
router.get('/match/date', verifyJWT, getAllMatchesByDate);
router.get('/match/live', verifyJWT, getAllLiveMatches);
router.get('/match/id', verifyJWT, getMatchById);
router.get('/verdict/:matchId', verifyJWT, getMatchVerdicts);
export default router;
