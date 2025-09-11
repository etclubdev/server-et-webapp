import express, { Request, Response } from 'express';
import authGuard from '../middlewares/authGuard.mdw';

import recruitmentController from '../controllers/recruitment.controller';

const router = express.Router();

router.get('/', recruitmentController.getStatusofFirstRecruitment);

export default router;