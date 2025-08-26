import express from 'express';
import apicache from 'apicache';

import authGuard from '../middlewares/authGuard.mdw';
import etNewsController from '../controllers/etNews.controller';
import validate from '../middlewares/validate.mdw';
import { createNewsSchema, updateNewsSchema } from '../entities/etnews.entity';
import { manangeEtNewsRole } from '../global/roles';

const router = express.Router();
const cache = apicache.middleware;

router.delete('/bulk-delete', authGuard.verifyRoles(manangeEtNewsRole), etNewsController.deleteMultipleEtNews);
router.delete('/:id', authGuard.verifyRoles(manangeEtNewsRole), etNewsController.deleteETNews);
router.put('/:id', authGuard.verifyRoles(manangeEtNewsRole), validate(updateNewsSchema), etNewsController.updateETNews);
router.post('/', authGuard.verifyRoles(manangeEtNewsRole), validate(createNewsSchema), etNewsController.createETNews);
router.get('/:id', etNewsController.getETNewsbyID);
router.get('/', cache('30 minutes'), etNewsController.getAllETNews);

export default router;
