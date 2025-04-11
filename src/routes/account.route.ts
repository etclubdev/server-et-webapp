import { Router } from 'express';

import validate from '../middlewares/validate.mdw';
import { updateAccountSchema } from '../entities/account.entity';
import accountController from '../controllers/account.controller';

const router = Router();

router.get('/:id', accountController.getAccountById);
router.get('/', accountController.getAllAccount);
router.put('/:id', validate(updateAccountSchema), accountController.updateAccount);

export default router;