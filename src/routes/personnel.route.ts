import express from "express";
import personnelController from "../controllers/personnel.controller";

const router = express.Router();

router.get("/status/:status", personnelController.getPersonnelByStatus);

export default router;