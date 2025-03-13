import express from "express";
import validate from "../middlewares/validate.mdw";
import faqController from "../controllers/faq.controller";
import { createFAQSchema } from "../entities/faq.entity";

const router = express.Router();
router.get("/", faqController.getAllFAQs);
router.post("/", validate(createFAQSchema), faqController.createFAQ);

export default router;

