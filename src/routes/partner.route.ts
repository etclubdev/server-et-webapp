import { Router } from 'express';

import partnerController from '../controllers/partner.controller';

const router = Router();

router.get('/', partnerController.getAllPartner);

export default router;