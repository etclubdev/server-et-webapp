import express from "express";
import personnelController from "../controllers/personnel.controller";
import validate from "../middlewares/validate.mdw";
import { createPersonnelWithStatusSchema, updatePersonnelSchema } from "../entities/personnel.entity";

const router = express.Router();

router.delete("/bulk-delete", personnelController.deleteMultiplePersonnels);
router.delete("/:id", personnelController.deletePersonnel);
router.put("/:id", validate(updatePersonnelSchema), personnelController.updatePersonnel);
router.get("/", personnelController.getPersonnels);
router.get("/unregistered", personnelController.getUnregisteredPersonnels);
router.get("/:id", personnelController.getPersonnelByID);
router.post("/", validate(createPersonnelWithStatusSchema), personnelController.createPersonnelWithStatus);

export default router; 