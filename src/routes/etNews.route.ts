import express from 'express';

import etNewsController from '../controllers/etNews.controller';
import validate from '../middlewares/validate.mdw';
import { createNewsSchema } from '../entities/etnews.entity';

const router = express.Router();

router.post('/', validate(createNewsSchema), etNewsController.createETNews);
router.get('/:id', etNewsController.getETNewsbyID);
router.get('/', etNewsController.getAllETNews);

export default router;
