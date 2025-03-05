import express from "express";
import activitiesController from "../controllers/activities.controller";

const router = express.Router();

router.get("/", activitiesController.getAllActivities);

export default router;  