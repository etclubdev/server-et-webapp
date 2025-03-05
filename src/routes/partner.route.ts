import { Router } from 'express';

import partnerController from '../controllers/partner.controller';
import validate from '../middlewares/validate.mdw';
import { updatePartnerSchema } from '../entities/partner.entity';

const router = Router();

router.put('/:id', validate(updatePartnerSchema), partnerController.updatePartner);

export default router;