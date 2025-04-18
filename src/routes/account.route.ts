import { Router } from 'express';

import validate from '../middlewares/validate.mdw';
import { updateAccountSchema, updateAccountPasswordSchema, createAccountSchema } from '../entities/account.entity';
import accountController from '../controllers/account.controller';
import authGuard from '../middlewares/authGuard.mdw';

const router = Router();

router.post('/', authGuard.verifyRoles(['Administrator']), validate(createAccountSchema), accountController.createAccount);
router.get('/:id', authGuard.verifyRoles(['Administrator']), accountController.getAccountById);
router.get('/', authGuard.verifyRoles(['Administrator']), accountController.getAllAccount);
router.put('/change-password/:id', authGuard.verifyRoles(['Administrator']), validate(updateAccountPasswordSchema), accountController.updatePassword);
router.put('/:id', authGuard.verifyRoles(['Administrator']), validate(updateAccountSchema), accountController.updateAccount);
router.delete('/bulk-delete', authGuard.verifyRoles(['Administrator']), accountController.deleteAccounts);
router.delete('/:id', authGuard.verifyRoles(['Administrator']), accountController.deleteAccount);


export default router;