import express from "express";
import authGuard from '../middlewares/authGuard.mdw';
import activityController from "../controllers/activity.controller";
import validate from "../middlewares/validate.mdw";
import { updateActivitySchema, createActivitySchema } from "../entities/activity.entity";

const router = express.Router();

router.get("/:id", authGuard.verifyRoles(['Administrator', 'Trưởng ban PR', 'Trưởng ban EV', 'CTV/TV']), activityController.getActivityById);
router.get("/", authGuard.verifyRoles(['Administrator', 'Trưởng ban PR', 'Trưởng ban EV', 'CTV/TV']), activityController.getAllActivities);
router.delete("/bulk-delete", authGuard.verifyRoles(['Administrator', 'Trưởng ban PR', 'Trưởng ban EV', 'CTV/TV']), activityController.deleteActivities);
router.delete("/:id", authGuard.verifyRoles(['Administrator', 'Trưởng ban PR', 'Trưởng ban EV', 'CTV/TV']), activityController.deleteActivity);
router.put("/:id", authGuard.verifyRoles(['Administrator', 'Trưởng ban PR', 'Trưởng ban EV', 'CTV/TV']), validate(updateActivitySchema), activityController.updateActivity);
router.post("/", authGuard.verifyRoles(['Administrator', 'Trưởng ban PR', 'Trưởng ban EV', 'CTV/TV']), validate(createActivitySchema), activityController.createActivity);

export default router; 
