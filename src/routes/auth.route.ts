import express from 'express';

import { authSchema } from '../entities/auth.entity';
import validate from '../middlewares/validate.mdw';
import authController from '../controllers/auth.controller';

const router = express.Router();

router.post('/login', validate(authSchema), authController.login);

export default router;