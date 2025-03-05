import express from 'express';

import etnewsController from '../controllers/etnews.controller';


const router = express.Router();

router.delete('/:id', etnewsController.deleteETNews);

export default router;