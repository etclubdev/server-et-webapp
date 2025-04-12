import express from "express";
import personnelController from "../controllers/personnel.controller";
import validate from "../middlewares/validate.mdw";


const router = express.Router();

router.get("/", personnelController.getPersonnels);

export default router;

