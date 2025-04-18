import express from 'express';
import authGuard from '../middlewares/authGuard.mdw';
import bannerController from '../controllers/banner.controller';
import validate from '../middlewares/validate.mdw';
import { createBannerSchema, updateBannerSchema } from '../entities/banner.entity';

const router = express.Router();

router.get('/', authGuard.verifyRoles(['Administrator', 'Trưởng ban PR']), bannerController.getAllBanners);
router.get('/:id', authGuard.verifyRoles(['Administrator', 'Trưởng ban PR']), bannerController.getBannerById);
router.post('/', authGuard.verifyRoles(['Administrator', 'Trưởng ban PR']), validate(createBannerSchema), bannerController.createBanner);
router.put('/:id', authGuard.verifyRoles(['Administrator', 'Trưởng ban PR']), validate(updateBannerSchema), bannerController.updateBanner);
router.delete('/bulk-delete', authGuard.verifyRoles(['Administrator', 'Trưởng ban PR']), bannerController.deleteBanners);
router.delete('/:id', authGuard.verifyRoles(['Administrator', 'Trưởng ban PR']), bannerController.deleteBanner);

export default router;