import express from 'express';

import etnewsController from '../controllers/etnews.controller';

const router = express.Router();
router.get('/', etnewsController.getAllETNews);

export default router;
