import express from 'express';

import applicationController from '../controllers/application.controller';
import authGuard from '../middlewares/authGuard.mdw';
import validate from '../middlewares/validate.mdw';
import { createApplicationSchema } from '../entities/application.entity';
import { managePersonnelRole } from '../global/roles';

const router = express.Router();

router.post('/', validate(createApplicationSchema), applicationController.createApplication);
router.get('/', authGuard.verifyRoles(managePersonnelRole), applicationController.getApplications);
router.get('/export', authGuard.verifyRoles(managePersonnelRole), applicationController.exportApplications);
router.get('/statistics', authGuard.verifyRoles(managePersonnelRole), applicationController.statisticsApplication);
router.get('/:id', authGuard.verifyRoles(managePersonnelRole), authGuard.verifyDepartmentForManageApplication(), applicationController.getApplicationById);
router.put('/restore', authGuard.verifyRoles(managePersonnelRole), authGuard.verifyDepartmentForManageApplication(), applicationController.restoreApplication);
router.put('/approve', authGuard.verifyRoles(managePersonnelRole), authGuard.verifyDepartmentForManageApplication(), applicationController.approveApplication);
router.put('/reject', authGuard.verifyRoles(managePersonnelRole), authGuard.verifyDepartmentForManageApplication(), applicationController.rejectApplication);
router.delete('/bulk-delete', authGuard.verifyRoles(managePersonnelRole), authGuard.verifyDepartmentForManageApplication(), applicationController.deleteApplications);

export default router;