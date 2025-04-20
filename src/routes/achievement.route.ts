import express from "express";

import achievementController from "../controllers/achievement.controller";
import validate from "../middlewares/validate.mdw";
import { updateAchievementSchema, createAchievementSchema } from "../entities/achievement.entity";

const router = express.Router();

router.put("/:id", validate(updateAchievementSchema), achievementController.updateAchievement);
router.delete('/bulk-delete', achievementController.deleteAchievements)
router.delete("/:id", achievementController.deleteAchievement);
router.get("/:id", achievementController.getAchievementById);
router.post("/", validate(createAchievementSchema), achievementController.createAchievement);
router.get("/", achievementController.getAllAchievements);

export default router; 