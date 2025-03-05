import express from 'express';

import etNewsController from '../controllers/etNews.controller';


const router = express.Router();

router.delete('/:id', etNewsController.deleteETNews);

export default router;