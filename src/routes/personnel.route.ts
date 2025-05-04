import express from "express";

import personnelController from "../controllers/personnel.controller";
import validate from "../middlewares/validate.mdw";
import { createPersonnelWithStatusSchema, updatePersonnelSchema } from "../entities/personnel.entity";
import authGuard from '../middlewares/authGuard.mdw';
import { getByIDPersonnelRole, managePersonnelRole } from "../global/roles";

const router = express.Router();

router.delete("/bulk-delete", authGuard.verifyRoles(managePersonnelRole), authGuard.verifyDepartmentForBulk(), personnelController.deleteMultiplePersonnels);

router.delete("/:id", authGuard.verifyRoles(managePersonnelRole), authGuard.verifyDepartment(), personnelController.deletePersonnel);

router.put("/:id", authGuard.verifyRoles(managePersonnelRole), authGuard.verifyDepartment(), validate(updatePersonnelSchema), personnelController.updatePersonnel);

router.get("/", authGuard.verifyRoles(managePersonnelRole), personnelController.getPersonnels);

router.get("/unregistered", authGuard.verifyRoles(managePersonnelRole), personnelController.getUnregisteredPersonnels);

router.get("/:id", authGuard.verifyRoles(getByIDPersonnelRole), personnelController.getPersonnelByID);

router.post("/", authGuard.verifyRoles(managePersonnelRole), authGuard.verifyDepartmentForPost, validate(createPersonnelWithStatusSchema), personnelController.createPersonnelWithStatus);

export default router; 