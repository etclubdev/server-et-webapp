import express from 'express';
import authGuard from '../middlewares/authGuard.mdw';
import bannerController from '../controllers/banner.controller';
import validate from '../middlewares/validate.mdw';
import { createBannerSchema, updateBannerSchema } from '../entities/banner.entity';
import { manageBannerRole } from '../global/roles';

const router = express.Router();

router.get('/', bannerController.getAllBanners);
router.get('/:id', bannerController.getBannerById);
router.post('/', authGuard.verifyRoles(manageBannerRole), validate(createBannerSchema), bannerController.createBanner);
router.put('/:id', authGuard.verifyRoles(manageBannerRole), validate(updateBannerSchema), bannerController.updateBanner);
router.delete('/bulk-delete', authGuard.verifyRoles(manageBannerRole), bannerController.deleteBanners);
router.delete('/:id', authGuard.verifyRoles(manageBannerRole), bannerController.deleteBanner);

export default router;