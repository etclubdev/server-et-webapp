import { Router } from "express";
import authGuard from '../middlewares/authGuard.mdw';
import systemRoleController from "../controllers/systemRole.controller";

const router = Router();

router.get("/", authGuard.verifyRoles(['Administrator']), systemRoleController.getAllSystemRole);

export default router;