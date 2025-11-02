import { Router } from "express";

import authGuard from '../middlewares/authGuard.mdw';
import systemRoleController from "../controllers/systemRole.controller";
import { adminRole } from "../global/roles";

const router = Router();

router.get("/", authGuard.verifyRoles(adminRole), systemRoleController.getAllSystemRole);

export default router;