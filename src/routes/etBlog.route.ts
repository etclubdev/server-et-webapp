import { Router } from "express";

import etBlogController from "../controllers/etBlog.controller";

const router = Router();

router.delete('/:id', etBlogController.deleteEtBlog);

export default router;