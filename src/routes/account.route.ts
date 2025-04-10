import express from 'express';

import validate from '../middlewares/validate.mdw';
import accountController from '../controllers/account.controller';
import { updateAccountPasswordSchema } from '../entities/account.entity';

const router = express.Router();

router.put('/change-password/:id', validate(updateAccountPasswordSchema), accountController.updatePassword);

export default router;