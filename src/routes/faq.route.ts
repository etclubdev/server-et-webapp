import express from "express";
import faqController from "../controllers/faq.controller";

const router = express.Router();

router.get("/:id", faqController.getFAQById);

export default router;
