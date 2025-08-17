import express from "express";
import apicache from "apicache";

import authGuard from '../middlewares/authGuard.mdw';
import validate from "../middlewares/validate.mdw";
import { updateFAQSchema } from "../entities/faq.entity";
import faqController from "../controllers/faq.controller";
import { createFAQSchema } from "../entities/faq.entity";
import { getFAQRole, manageFAQRole } from "../global/roles";

const router = express.Router();
const cache = apicache.middleware;

router.get("/:id", faqController.getFAQById);
router.get("/", cache('30 minutes'), faqController.getAllFAQs);
router.post("/", authGuard.verifyRoles(manageFAQRole), validate(createFAQSchema), faqController.createFAQ);
router.put("/:id", authGuard.verifyRoles(manageFAQRole), validate(updateFAQSchema), faqController.updateFAQ);
router.delete("/bulk-delete", authGuard.verifyRoles(manageFAQRole), faqController.deleteFAQs);
router.delete("/:id", authGuard.verifyRoles(manageFAQRole), faqController.deleteFAQ);



export default router;



