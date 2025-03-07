import express from 'express';

import etNewsController from '../controllers/etNews.controller';

const router = express.Router();

router.get('/:id', etNewsController.getETNewsbyIDController);
router.get('/', etNewsController.getAllETNews);

export default router;
