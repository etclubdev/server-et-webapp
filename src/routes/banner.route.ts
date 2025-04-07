import express from 'express';

import bannerController from '../controllers/banner.controller';
import validate from '../middlewares/validate.mdw';
import { createBannerSchema } from '../entities/banner.entity';

const router = express.Router();

router.post('/', validate(createBannerSchema), bannerController.createBanner);

export default router;