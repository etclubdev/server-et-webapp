import express from "express";
import deleteActivity from "../controllers/activity.controller";

const router = express.Router();
router.delete("/:id", deleteActivity);

export default router;