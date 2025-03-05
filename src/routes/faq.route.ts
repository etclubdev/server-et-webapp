import express from "express";
import createFAQ from "../controllers/faq.controller";
import validate from "../middlewares/validate.mdw";
import { createFAQSchema } from "../entities/faq.entity";


const router = express.Router();

router.post("/", validate(createFAQSchema), createFAQ);

export default router; 