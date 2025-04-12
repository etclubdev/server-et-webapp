import express from 'express';

import accountController from '../controllers/account.controller';
import validate from '../middlewares/validate.mdw';
import { createAccountSchema } from '../entities/account.entity';

const router = express.Router();

router.post('/', validate(createAccountSchema), accountController.createAccount);

export default router;