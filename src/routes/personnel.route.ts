import express from "express";
import personnelController from "../controllers/personnel.controller";

const router = express.Router();

router.get("/:id", personnelController.getPersonnelByID);

export default router;