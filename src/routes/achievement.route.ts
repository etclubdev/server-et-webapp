import express from "express";
import authGuard from '../middlewares/authGuard.mdw';
import achievementController from "../controllers/achievement.controller";
import validate from "../middlewares/validate.mdw";
import { updateAchievementSchema, createAchievementSchema } from "../entities/achievement.entity";

const router = express.Router();

router.put("/:id", authGuard.verifyRoles(['Administrator', 'Trưởng ban PR']), validate(updateAchievementSchema), achievementController.updateAchievement);
router.delete("/:id", authGuard.verifyRoles(['Administrator', 'Trưởng ban PR']), achievementController.deleteAchievement);
router.get("/:id", authGuard.verifyRoles(['Administrator', 'Trưởng ban PR']), achievementController.getAchievementById);
router.post("/", authGuard.verifyRoles(['Administrator', 'Trưởng ban PR']), validate(createAchievementSchema), achievementController.createAchievement);
router.get("/", authGuard.verifyRoles(['Administrator', 'Trưởng ban PR']), achievementController.getAllAchievements);

export default router; 