import { Router } from 'express';

import partnerController from '../controllers/partner.controller';
import validate from '../middlewares/validate.mdw';
import { createPartnerSchema, updatePartnerSchema } from '../entities/partner.entity';

const router = Router();

router.get('/:id', partnerController.getPartnerByID);
router.get('/', partnerController.getPartner);
router.post('/', validate(createPartnerSchema), partnerController.createPartner);
router.put('/:id', validate(updatePartnerSchema), partnerController.updatePartner);
router.delete('/bulk-delete', partnerController.deletePartners);
router.delete('/:id', partnerController.deletePartner);

export default router;  