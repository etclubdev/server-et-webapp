import express from 'express';

import applicationController from '../controllers/application.controller';
import authGuard from '../middlewares/authGuard.mdw';
import { managePersonnelRole } from '../global/roles';

const router = express.Router();

router.put('/restore', authGuard.verifyRoles(managePersonnelRole), authGuard.verifyDepartmentForManageApplication(), applicationController.restoreApplication);

export default router;