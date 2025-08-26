import express from "express";
import apicache from "apicache";

import authGuard from '../middlewares/authGuard.mdw';
import achievementController from "../controllers/achievement.controller";
import validate from "../middlewares/validate.mdw";
import { updateAchievementSchema, createAchievementSchema } from "../entities/achievement.entity";
import { manageAchivementRole } from "../global/roles";

const router = express.Router();
const cache = apicache.middleware;

router.put("/:id", authGuard.verifyRoles(manageAchivementRole), validate(updateAchievementSchema), achievementController.updateAchievement);
router.delete('/bulk-delete', authGuard.verifyRoles(manageAchivementRole), achievementController.deleteAchievements)
router.delete("/:id", authGuard.verifyRoles(manageAchivementRole), achievementController.deleteAchievement);
router.get("/:id", achievementController.getAchievementById);
router.post("/", authGuard.verifyRoles(manageAchivementRole), validate(createAchievementSchema), achievementController.createAchievement);
router.get("/", cache('30 minutes'), achievementController.getAllAchievements);

export default router; 