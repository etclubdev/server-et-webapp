import express from "express";
import getActivityById from "../controllers/activity.controller";

const router = express.Router();

router.get("/:id", getActivityById);

export default router; 