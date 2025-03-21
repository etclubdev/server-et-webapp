import express from "express";

import achievementController from "../controllers/achievement.controller";
import validate from "../middlewares/validate.mdw";
import { updateAchievementSchema } from "../entities/achievement.entity";

const router = express.Router();

router.put("/:id", validate(updateAchievementSchema), achievementController.updateAchievement);

export default router; 