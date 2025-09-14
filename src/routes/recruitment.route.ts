import epress from 'express';

import recruitmentController from '../controllers/recruitment.controller';
import authGuard from '../middlewares/authGuard.mdw';
import { adminRole } from '../global/roles';

const router = epress.Router();

router.get('/', recruitmentController.getStatusofFirstRecruitment);
router.put('/:id', authGuard.verifyRoles(adminRole), recruitmentController.updateStatusOfRecruitment);

export default router; 
