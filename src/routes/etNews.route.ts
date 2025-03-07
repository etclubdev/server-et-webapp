import express from 'express';

import etNewsController from '../controllers/etNews.controller';
import validate from '../middlewares/validate.mdw';
import { createNewsSchema } from '../entities/etNews.entity';

const router = express.Router();

router.post('/', validate(createNewsSchema), etNewsController.createETNews);

export default router;