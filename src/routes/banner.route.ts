import express from 'express';

import bannerController from '../controllers/banner.controller';

const router = express.Router();

router.get('/:id', bannerController.getBannerById);

export default router;