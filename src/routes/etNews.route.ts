import express from 'express';
import authGuard from '../middlewares/authGuard.mdw';
import etNewsController from '../controllers/etNews.controller';
import validate from '../middlewares/validate.mdw';
import { createNewsSchema, updateNewsSchema } from '../entities/etnews.entity';

const router = express.Router();

router.delete('/bulk-delete', authGuard.verifyRoles(['Administrator', 'Trưởng ban PR', 'CTV/TV']), etNewsController.deleteMultipleEtNews);
router.delete('/:id', authGuard.verifyRoles(['Administrator', 'Trưởng ban PR', 'CTV/TV']), etNewsController.deleteETNews);
router.put('/:id', authGuard.verifyRoles(['Administrator', 'Trưởng ban PR', 'CTV/TV']), validate(updateNewsSchema), etNewsController.updateETNews);
router.post('/', authGuard.verifyRoles(['Administrator', 'Trưởng ban PR', 'CTV/TV']), validate(createNewsSchema), etNewsController.createETNews);
router.get('/:id', authGuard.verifyRoles(['Administrator', 'Trưởng ban PR', 'CTV/TV']), etNewsController.getETNewsbyID);
router.get('/', authGuard.verifyRoles(['Administrator', 'Trưởng ban PR', 'CTV/TV']), etNewsController.getAllETNews);

export default router;
