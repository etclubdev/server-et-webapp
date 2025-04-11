import express from 'express';

import bannerController from '../controllers/banner.controller';
import validate from '../middlewares/validate.mdw';
import { createBannerSchema, updateBannerSchema } from '../entities/banner.entity';


const router = express.Router();

router.get('/', bannerController.getAllBanners);
router.get('/:id', bannerController.getBannerById);
router.post('/', validate(createBannerSchema), bannerController.createBanner);
router.put('/:id', validate(updateBannerSchema), bannerController.updateBanner);

export default router;