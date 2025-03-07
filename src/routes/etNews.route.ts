import express from 'express';

import etNewsController from '../controllers/etNews.controller';
import validate from '../middlewares/validate.mdw'; 
import { updateNewsSchema }  from '../entities/etNews.entity'

const router = express.Router();

router.put('/:id', validate(updateNewsSchema),etNewsController.updateETNewsController);

export default router;