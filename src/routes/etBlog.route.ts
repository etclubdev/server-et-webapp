import { Router } from "express";

import etBlogController from "../controllers/etBlog.controller"; 

const router = Router();

router.get("/:id", etBlogController.getEtBlogById); 

export default router;