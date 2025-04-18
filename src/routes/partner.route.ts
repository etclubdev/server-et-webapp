import { Router } from 'express';
import authGuard from '../middlewares/authGuard.mdw';
import partnerController from '../controllers/partner.controller';
import validate from '../middlewares/validate.mdw';
import { createPartnerSchema, updatePartnerSchema } from '../entities/partner.entity';

const router = Router();

router.put('/bulk-update', authGuard.verifyRoles(['Administrator', 'Trưởng ban PR', 'Trưởng ban FER']), partnerController.updateVisible);
router.get('/:id', authGuard.verifyRoles(['Administrator', 'Trưởng ban PR', 'Trưởng ban FER']), partnerController.getPartnerByID);
router.get('/', authGuard.verifyRoles(['Administrator', 'Trưởng ban PR', 'Trưởng ban FER']), partnerController.getPartner);
router.post('/', authGuard.verifyRoles(['Administrator', 'Trưởng ban PR', 'Trưởng ban FER']), validate(createPartnerSchema), partnerController.createPartner);
router.put('/:id', authGuard.verifyRoles(['Administrator', 'Trưởng ban PR', 'Trưởng ban FER']), validate(updatePartnerSchema), partnerController.updatePartner);
router.delete('/bulk-delete', authGuard.verifyRoles(['Administrator', 'Trưởng ban PR', 'Trưởng ban FER']), partnerController.deletePartners);
router.delete('/:id', authGuard.verifyRoles(['Administrator', 'Trưởng ban PR', 'Trưởng ban FER']), partnerController.deletePartner);

export default router;  