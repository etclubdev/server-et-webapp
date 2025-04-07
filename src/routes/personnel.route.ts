import express from "express";
import personnelController from "../controllers/personnel.controller";

const router = express.Router();
router.delete("/", personnelController.deleteMultiplePersonnels);

export default router;