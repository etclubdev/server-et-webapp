import { Router } from 'express';

import validate from '../middlewares/validate.mdw';
import { updateAccountSchema, updateAccountPasswordSchema, createAccountSchema } from '../entities/account.entity';
import accountController from '../controllers/account.controller';
import authGuard from '../middlewares/authGuard.mdw';
import { adminRole, changePasswordRole } from '../global/roles';

const router = Router();

router.post('/', authGuard.verifyRoles(adminRole), validate(createAccountSchema), accountController.createAccount);
router.get('/:id', authGuard.verifyRoles(adminRole), accountController.getAccountById);
router.get('/', authGuard.verifyRoles(adminRole), accountController.getAllAccount);
router.put('/reset-password/:id', authGuard.verifyRoles(adminRole), accountController.resetPassword);
router.put('/change-password/:id', authGuard.verifyRoles(changePasswordRole), validate(updateAccountPasswordSchema), accountController.updatePassword);
router.put('/:id', authGuard.verifyRoles(adminRole), validate(updateAccountSchema), accountController.updateAccount);
router.delete('/bulk-delete', authGuard.verifyRoles(adminRole), accountController.deleteAccounts);
router.delete('/:id', authGuard.verifyRoles(adminRole), accountController.deleteAccount);


export default router;