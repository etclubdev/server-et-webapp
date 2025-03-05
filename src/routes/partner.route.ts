import { Router } from 'express';

import partnerController from '../controllers/partner.controller';

const router = Router();

router.delete('/:id', partnerController.deletePartner);

export default router;