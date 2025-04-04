import express from "express";

import validate from "../middlewares/validate.mdw";
import { updateFAQSchema } from "../entities/faq.entity";
import faqController from "../controllers/faq.controller";
import { createFAQSchema } from "../entities/faq.entity";

const router = express.Router();

router.get("/:id", faqController.getFAQById);
router.get("/", faqController.getAllFAQs);
router.post("/", validate(createFAQSchema), faqController.createFAQ);
router.put("/:id", validate(updateFAQSchema), faqController.updateFAQ);
router.delete("/bulk-delete", faqController.deleteFAQs);
router.delete("/:id", faqController.deleteFAQ);



export default router;



