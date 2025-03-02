import { Router } from "express";

import etBlogController from "../controllers/etBlog.controller";
import validate from "../middlewares/validate.mdw";
import { updateBlogSchema } from "../entities/etBlog.entity";

const router = Router();

router.put('/:id', validate(updateBlogSchema), etBlogController.updateEtBlog);

export default router;