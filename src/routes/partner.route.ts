import { Router } from 'express';

import partnerController from '../controllers/partner.controller';
import validate from '../middlewares/validate.mdw';
import { createPartnerSchema } from '../entities/partner.entity';

const router = Router();

router.post('/', validate(createPartnerSchema), partnerController.createPartner);

export default router;