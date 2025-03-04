import { Router } from "express";

import etBlogController from "../controllers/etBlog.controller"; 
import validate from "../middlewares/validate.mdw";
import { createBlogSchema, updateBlogSchema } from "../entities/etBlog.entity";

const router = Router();

router.get("/:id", etBlogController.getEtBlogById); 
router.get("/", etBlogController.getAllEtBlogs);
router.post('/', validate(createBlogSchema), etBlogController.createEtBlog);
router.put('/:id', validate(updateBlogSchema), etBlogController.updateEtBlog);
router.delete('/:id', etBlogController.deleteEtBlog);

export default router;