import express from 'express';

import etnewsController from '../controllers/etnews.controller';
import validate from '../middlewares/validate.mdw'; 
import { updateNewsSchema }  from '../entities/etnews.entity'

const router = express.Router();

router.put('/:id', validate(updateNewsSchema),etnewsController.updateETNewsController);

export default router;