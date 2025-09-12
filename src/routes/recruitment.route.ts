import epress from 'express';

import recruitmentController from '../controllers/recruitment.controller';
import authGuard from '../middlewares/authGuard.mdw';
import { adminRole } from '../global/roles';

const router = epress.Router();

router.put('/', authGuard.verifyRoles(adminRole), recruitmentController.updateFirstRecruitment);

export default router; 