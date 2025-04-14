import express from "express";

import achievementController from "../controllers/achievement.controller";
import validate from "../middlewares/validate.mdw";


const router = express.Router();

router.get("/", achievementController.getAllAchievements);

export default router; 