import { Router } from 'express';

import accountController from '../controllers/account.controller';

const router = Router();

router.get('/:id', accountController.getAccountById);

export default router;