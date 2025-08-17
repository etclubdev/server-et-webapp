import express from "express";
import apicache from "apicache";

import authGuard from '../middlewares/authGuard.mdw';
import activityController from "../controllers/activity.controller";
import validate from "../middlewares/validate.mdw";
import { updateActivitySchema, createActivitySchema } from "../entities/activity.entity";
import { manageActivityRole } from "../global/roles";

const router = express.Router();
const cache = apicache.middleware;

router.get("/:id", activityController.getActivityById);
router.get("/", cache('30 minutes'), activityController.getAllActivities);
router.delete("/bulk-delete", authGuard.verifyRoles(manageActivityRole), activityController.deleteActivities);
router.delete("/:id", authGuard.verifyRoles(manageActivityRole), activityController.deleteActivity);
router.put("/:id", authGuard.verifyRoles(manageActivityRole), validate(updateActivitySchema), activityController.updateActivity);
router.post("/", authGuard.verifyRoles(manageActivityRole), validate(createActivitySchema), activityController.createActivity);

export default router; 
