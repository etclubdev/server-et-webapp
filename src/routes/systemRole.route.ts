import { Router } from "express";

import systemRoleController from "../controllers/systemRole.controller";

const router = Router();

router.get("/", systemRoleController.getAllSystemRole);

export default router;