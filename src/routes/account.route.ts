import { Router } from 'express';

import validate from '../middlewares/validate.mdw';
import { updateAccountSchema, updateAccountPasswordSchema, createAccountSchema } from '../entities/account.entity';
import accountController from '../controllers/account.controller';
import authGuard from '../middlewares/authGuard.mdw';
import { adminRole, changePasswordRole, manageAccountRole } from '../global/roles';

const router = Router();

router.post('/', authGuard.verifyRoles(manageAccountRole), validate(createAccountSchema), accountController.createAccount);
router.get('/:id', authGuard.verifyRoles(manageAccountRole), accountController.getAccountById);
router.get('/', authGuard.verifyRoles(manageAccountRole), accountController.getAllAccount);
router.put('/reset-password/:id', authGuard.verifyRoles(adminRole), accountController.resetPassword);
router.put('/change-password/:id', authGuard.verifyRoles(changePasswordRole), validate(updateAccountPasswordSchema), accountController.updatePassword);
router.put('/:id', authGuard.verifyRoles(manageAccountRole), validate(updateAccountSchema), accountController.updateAccount);
router.delete('/bulk-delete', authGuard.verifyRoles(manageAccountRole), accountController.deleteAccounts);
router.delete('/:id', authGuard.verifyRoles(manageAccountRole), accountController.deleteAccount);


export default router;