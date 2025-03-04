import express from 'express';

import etnewsController from '../controllers/etnews.controller';
import validate from '../middlewares/validateETNews.mdw';
import { createNewsSchema } from '../entities/etnews.entity';

const router = express.Router();

router.post('/', validate(createNewsSchema), etnewsController.createETNews);

export default router;