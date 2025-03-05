import { Router } from 'express';

import partnerController from '../controllers/partner.controller';

const router = Router();

router.get('/:id', partnerController.getPartnerByID);

export default router;