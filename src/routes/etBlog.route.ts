import { Router } from "express";

import etBlogController from "../controllers/etBlog.controller"; 

const router = Router();

router.get("/:id", etBlogController.getEtBlogById); 
router.get("/", etBlogController.getAllEtBlogs); 

export default router;