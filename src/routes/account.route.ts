import { Router } from 'express';

import validate from '../middlewares/validate.mdw';
import { updateAccountSchema, updateAccountPasswordSchema, createAccountSchema } from '../entities/account.entity';
import accountController from '../controllers/account.controller';

const router = Router();

router.post('/', validate(createAccountSchema), accountController.createAccount);
router.get('/:id', accountController.getAccountById);
router.get('/', accountController.getAllAccount);
router.put('/change-password/:id', validate(updateAccountPasswordSchema), accountController.updatePassword);
router.put('/:id', validate(updateAccountSchema), accountController.updateAccount);
router.delete('/bulk-delete', accountController.deleteAccounts);
router.delete('/:id', accountController.deleteAccount);


export default router;