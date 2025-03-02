import { Router } from "express";

import etBlogController from "../controllers/etBlog.controller";
import validate from "../middlewares/validate.mdw";
import { createBlogSchema } from "../entities/etBlog.entity";

const router = Router();

router.post('/', validate(createBlogSchema), etBlogController.createEtBlog);

export default router;