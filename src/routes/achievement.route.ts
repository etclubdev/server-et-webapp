import express from "express";

import achievementController from "../controllers/achievement.controller";
import validate from "../middlewares/validate.mdw";
import { createAchievementSchema } from "../entities/achievement.entity";

const router = express.Router();

router.get("/:id", achievementController.getAchievementById);
router.post("/", validate(createAchievementSchema), achievementController.createAchievement);
router.get("/", achievementController.getAllAchievements);

export default router; 