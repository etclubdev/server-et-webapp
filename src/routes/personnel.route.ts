import express from "express";
import personnelController from "../controllers/personnel.controller";

const router = express.Router();

router.get("/department/:departmentName", personnelController.getPersonnelByDepartment);

export default router;