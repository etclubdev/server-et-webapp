import express from "express";
import faqController from "../controllers/faq.controller";
import validate from "../middlewares/validate.mdw";
import { createFAQSchema } from "../entities/faq.entity";
const router = express.Router();

router.get("/:id", faqController.getFAQById);



router.get("/", faqController.getAllFAQs);
router.post("/", validate(createFAQSchema), faqController.createFAQ);




export default router;


