import express from 'express';

import bannerController from '../controllers/banner.controller';

const router = express.Router();

router.get('/', bannerController.getAllBanners);

export default router;
