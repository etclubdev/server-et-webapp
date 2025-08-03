import { Router } from 'express';

import authGuard from '../middlewares/authGuard.mdw';
import partnerController from '../controllers/partner.controller';
import validate from '../middlewares/validate.mdw';
import { createPartnerSchema, updatePartnerSchema } from '../entities/partner.entity';
import { getPartnerRole, managePartnerRole } from '../global/roles';

const router = Router();

router.put('/bulk-update', authGuard.verifyRoles(managePartnerRole), partnerController.updateVisible);
router.get('/:id', partnerController.getPartnerByID);
router.get('/', partnerController.getPartner);
router.post('/', authGuard.verifyRoles(managePartnerRole), validate(createPartnerSchema), partnerController.createPartner);
router.put('/:id', authGuard.verifyRoles(managePartnerRole), validate(updatePartnerSchema), partnerController.updatePartner);
router.delete('/bulk-delete', authGuard.verifyRoles(managePartnerRole), partnerController.deletePartners);
router.delete('/:id', authGuard.verifyRoles(managePartnerRole), partnerController.deletePartner);

export default router;  