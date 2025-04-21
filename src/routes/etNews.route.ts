import express from 'express';
import authGuard from '../middlewares/authGuard.mdw';
import etNewsController from '../controllers/etNews.controller';
import validate from '../middlewares/validate.mdw';
import { createNewsSchema, updateNewsSchema } from '../entities/etnews.entity';
import { manangeEtNewsRole } from '../global/roles';

const router = express.Router();

router.delete('/bulk-delete', authGuard.verifyRoles(manangeEtNewsRole), etNewsController.deleteMultipleEtNews);
router.delete('/:id', authGuard.verifyRoles(manangeEtNewsRole), etNewsController.deleteETNews);
router.put('/:id', authGuard.verifyRoles(manangeEtNewsRole), validate(updateNewsSchema), etNewsController.updateETNews);
router.post('/', authGuard.verifyRoles(manangeEtNewsRole), validate(createNewsSchema), etNewsController.createETNews);
router.get('/:id', authGuard.verifyRoles(manangeEtNewsRole), etNewsController.getETNewsbyID);
router.get('/', authGuard.verifyRoles(manangeEtNewsRole), etNewsController.getAllETNews);

export default router;
