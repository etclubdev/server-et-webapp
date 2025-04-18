import express from "express";
import authGuard from '../middlewares/authGuard.mdw';
import validate from "../middlewares/validate.mdw";
import { updateFAQSchema } from "../entities/faq.entity";
import faqController from "../controllers/faq.controller";
import { createFAQSchema } from "../entities/faq.entity";

const router = express.Router();

router.get("/:id", authGuard.verifyRoles(['Administrator', 'Trưởng ban PR']), faqController.getFAQById);
router.get("/", authGuard.verifyRoles(['Administrator', 'Trưởng ban PR']), faqController.getAllFAQs);
router.post("/", authGuard.verifyRoles(['Administrator', 'Trưởng ban PR']), validate(createFAQSchema), faqController.createFAQ);
router.put("/:id", authGuard.verifyRoles(['Administrator', 'Trưởng ban PR']), validate(updateFAQSchema), faqController.updateFAQ);
router.delete("/bulk-delete", authGuard.verifyRoles(['Administrator', 'Trưởng ban PR']), faqController.deleteFAQs);
router.delete("/:id", authGuard.verifyRoles(['Administrator', 'Trưởng ban PR']), faqController.deleteFAQ);



export default router;



