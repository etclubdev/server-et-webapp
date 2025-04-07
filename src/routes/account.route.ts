import { Router } from 'express';

import accountController from '../controllers/account.controller';

const router = Router();

router.delete('/bulk-delete', accountController.deleteAccounts);
router.delete('/:id', accountController.deleteAccount);

export default router;