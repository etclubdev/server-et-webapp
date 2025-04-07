import express from 'express';

import bannerController from '../controllers/banner.controller';

const router = express.Router();

router.delete('/bulk-delete', bannerController.deleteBanners);
router.delete('/:id', bannerController.deleteBanner);

export default router;