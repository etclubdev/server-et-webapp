import { Router } from 'express';

import partnerController from '../controllers/partner.controller';

const router = Router();

router.get('/', partnerController.getPartnerByCategory);

export default router;