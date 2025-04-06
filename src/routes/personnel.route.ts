import express from "express";
import personnelController from "../controllers/personnel.controller";
import validate from "../middlewares/validate.mdw";
import { updatePersonnelSchema } from "../entities/personnel.entity";

const router = express.Router();

// Route for updating a personnel by ID
router.put("/:id", validate(updatePersonnelSchema), personnelController.updatePersonnel);

export default router;