import express from 'express';

import applicationController from '../controllers/application.controller';
import authGuard from '../middlewares/authGuard.mdw';
import { managePersonnelRole } from '../global/roles';

const router = express.Router();

router.put('/approve', authGuard.verifyRoles(managePersonnelRole), authGuard.verifyDepartmentForManageApplication(), applicationController.approveApplication);
router.delete("/bulk-delete", authGuard.verifyRoles(managePersonnelRole), authGuard.verifyDepartmentForManageApplication(), applicationController.deleteApplications);
export default router;