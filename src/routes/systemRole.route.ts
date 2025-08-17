import { Router } from "express";
import apicache from "apicache";

import authGuard from '../middlewares/authGuard.mdw';
import systemRoleController from "../controllers/systemRole.controller";
import { adminRole } from "../global/roles";

const router = Router();
const cache = apicache.middleware;

router.get("/", authGuard.verifyRoles(adminRole), cache('30 minutes'), systemRoleController.getAllSystemRole);

export default router;