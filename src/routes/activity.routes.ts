import express from "express";
import updateActivity from "../controllers/activity.controller";
import validate from "../middlewares/validate.mdw";
import { updateActivitySchema } from "../entities/activity.schema";


const router = express.Router();

router.put("/:id", validate(updateActivitySchema), updateActivity);

export default router; 