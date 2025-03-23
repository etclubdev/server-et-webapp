import express from "express";

import personnelController from "../controllers/personnel.controller";
import validate from "../middlewares/validate.mdw";
import { createPersonnelWithStatusSchema } from "../entities/personnel.entity";

const router = express.Router();

router.post("/", validate(createPersonnelWithStatusSchema), personnelController.createPersonnelWithStatus);

export default router; 