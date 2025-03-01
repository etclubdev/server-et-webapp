import express from "express";
import updateActivity from "../controllers/activity.controller";
import validateUpdateActivityMiddleware from "../middlewares/validateUpdateActivity";

const router = express.Router();

router.put("/:id", validateUpdateActivityMiddleware, updateActivity);

export default router;
