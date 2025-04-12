import express from "express";
import personnelController from "../controllers/personnel.controller";

const router = express.Router();

router.get("/", personnelController.getPersonnels);

export default router;