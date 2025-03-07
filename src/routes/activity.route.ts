import express from "express";

import activityController from "../controllers/activity.controller";
import validate from "../middlewares/validate.mdw";
import { updateActivitySchema, createActivitySchema } from "../entities/activity.entity";

const router = express.Router();

router.get("/", activityController.getAllActivities);
router.delete("/:id", activityController.deleteActivity);
router.put("/:id", validate(updateActivitySchema), activityController.updateActivity);
router.post("/", validate(createActivitySchema), activityController.createActivity);

export default router; 
