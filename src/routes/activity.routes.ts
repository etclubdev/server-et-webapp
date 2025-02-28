import express from "express";
import getAllActivities from "../controllers/activities.controller";

const router = express.Router();

router.get("/", getAllActivities);

export default router;  