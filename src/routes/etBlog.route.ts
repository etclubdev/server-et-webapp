import { Router } from "express";
import authGuard from '../middlewares/authGuard.mdw';
import etBlogController from "../controllers/etBlog.controller";
import validate from "../middlewares/validate.mdw";
import { createBlogSchema, updateBlogSchema } from "../entities/etBlog.entity";

const router = Router();

router.get("/:id", authGuard.verifyRoles(['Administrator', 'Trưởng ban PR', 'CTV/TV']), etBlogController.getEtBlogById);
router.get("/", authGuard.verifyRoles(['Administrator', 'Trưởng ban PR', 'CTV/TV']), etBlogController.getAllEtBlogs);
router.post('/', authGuard.verifyRoles(['Administrator', 'Trưởng ban PR', 'CTV/TV']), validate(createBlogSchema), etBlogController.createEtBlog);
router.put('/:id', authGuard.verifyRoles(['Administrator', 'Trưởng ban PR', 'CTV/TV']), validate(updateBlogSchema), etBlogController.updateEtBlog);
router.delete('/bulk-delete', authGuard.verifyRoles(['Administrator', 'Trưởng ban PR', 'CTV/TV']), etBlogController.deleteEtBlogs);
router.delete('/:id', authGuard.verifyRoles(['Administrator', 'Trưởng ban PR', 'CTV/TV']), etBlogController.deleteEtBlog);

export default router;