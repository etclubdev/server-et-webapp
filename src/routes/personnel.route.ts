import express from "express";
import personnelController from "../controllers/personnel.controller";
import validate from "../middlewares/validate.mdw";
import { createPersonnelWithStatusSchema, updatePersonnelSchema } from "../entities/personnel.entity";
import authGuard from '../middlewares/authGuard.mdw';

const router = express.Router();

router.delete("/bulk-delete", authGuard.verifyRoles([
    'Administrator',
    'Trưởng ban Tech',
    'Trưởng ban PR',
    'Trưởng ban HR',
    'Trưởng ban EV',
    'Trưởng ban FER']), personnelController.deleteMultiplePersonnels);

router.delete("/:id", authGuard.verifyRoles([
    'Administrator',
    'Trưởng ban Tech',
    'Trưởng ban PR',
    'Trưởng ban HR',
    'Trưởng ban EV',
    'Trưởng ban FER']), personnelController.deletePersonnel);

router.put("/:id", authGuard.verifyRoles([
    'Administrator',
    'Trưởng ban Tech',
    'Trưởng ban PR',
    'Trưởng ban HR',
    'Trưởng ban EV',
    'Trưởng ban FER']), validate(updatePersonnelSchema), personnelController.updatePersonnel);

router.get("/", authGuard.verifyRoles([
    'Administrator',
    'Trưởng ban Tech',
    'Trưởng ban PR',
    'Trưởng ban HR',
    'Trưởng ban EV',
    'Trưởng ban FER']), personnelController.getPersonnels);

router.get("/unregistered", authGuard.verifyRoles([
    'Administrator',
    'Trưởng ban Tech',
    'Trưởng ban PR',
    'Trưởng ban HR',
    'Trưởng ban EV',
    'Trưởng ban FER']), personnelController.getUnregisteredPersonnels);

router.get("/:id", authGuard.verifyRoles([
    'Administrator',
    'Trưởng ban Tech',
    'Trưởng ban PR',
    'Trưởng ban HR',
    'Trưởng ban EV',
    'Trưởng ban FER']), personnelController.getPersonnelByID);

router.post("/", authGuard.verifyRoles([
    'Administrator',
    'Trưởng ban Tech',
    'Trưởng ban PR',
    'Trưởng ban HR',
    'Trưởng ban EV',
    'Trưởng ban FER']), validate(createPersonnelWithStatusSchema), personnelController.createPersonnelWithStatus);

export default router; 