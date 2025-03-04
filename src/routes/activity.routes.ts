import express from "express";
import createActivity from "../controllers/activities.controller";
import validate from "../middlewares/validate.mdw";
import { createActivitySchema } from "../schema/activity.schema";


const router = express.Router();

router.post("/", validate(createActivitySchema), createActivity);

export default router; 