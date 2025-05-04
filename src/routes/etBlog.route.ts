import { Router } from "express";
import authGuard from '../middlewares/authGuard.mdw';
import etBlogController from "../controllers/etBlog.controller";
import validate from "../middlewares/validate.mdw";
import { createBlogSchema, updateBlogSchema } from "../entities/etBlog.entity";
import { manageEtBlogRole } from "../global/roles";

const router = Router();

router.get("/:id", etBlogController.getEtBlogById);
router.get("/", etBlogController.getAllEtBlogs);
router.post('/', authGuard.verifyRoles(manageEtBlogRole), validate(createBlogSchema), etBlogController.createEtBlog);
router.put('/:id', authGuard.verifyRoles(manageEtBlogRole), validate(updateBlogSchema), etBlogController.updateEtBlog);
router.delete('/bulk-delete', authGuard.verifyRoles(manageEtBlogRole), etBlogController.deleteEtBlogs);
router.delete('/:id', authGuard.verifyRoles(manageEtBlogRole), etBlogController.deleteEtBlog);

export default router;