import express from "express";
import updateFAQ from "../controllers/faq.controller";
import validate from "../middlewares/validate.mdw";
import { updateFAQSchema } from "../entities/faq.entity";

const router = express.Router();

router.put("/:id", validate(updateFAQSchema), updateFAQ);

export default router;



