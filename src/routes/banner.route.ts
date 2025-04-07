import express from 'express';

import bannerController from '../controllers/banner.controller';
import  validate from '../middlewares/validate.mdw';
import { updateBannerSchema } from '../entities/banner.entity';

const router = express.Router();

router.put('/:id', validate(updateBannerSchema), bannerController.updateBanner);

export default router;