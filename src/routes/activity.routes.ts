import express from "express";
import activitiesController from "../controllers/activity.controller";

const router = express.Router();

router.get("/:id", activitiesController.getActivityById);

export default router; 