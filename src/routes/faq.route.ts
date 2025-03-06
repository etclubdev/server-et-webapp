import express from "express";
import deleteFAQ from "../controllers/faq.controller";

const router = express.Router();

router.delete("/:id", deleteFAQ);

export default router;
