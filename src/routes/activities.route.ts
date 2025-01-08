import express from 'express';
import selectActivitybyID from '../controllers/activities.controller';
import validateActivityID from '../middlewares/validateActivityID.middleware';
const router = express.Router();

router.get('/:activityid?', validateActivityID, selectActivitybyID);

export default router;
