import { Request, Response } from "express";
import faqService from "../services/faq.service";


export default {
    getAllFAQs: async (req: Request, res: Response) => {
        try {
            const faqs = await faqService.getAllFAQs();

            if (!faqs || faqs.length === 0) {
                res.status(404).json({
                    message: "No FAQs found!",
                    data: []
                });
                return;
            }

            res.status(200).json({
                message: "Successfully retrieved FAQs",
                data: faqs
            });
            return;

        } catch (error) {
            console.error("Error retrieving FAQs:", error);
            res.status(500).json({
                message: "Internal Server Error: " + error.message
            });
            return;
        }
    },


    createFAQ: async (req: Request, res: Response) => {
        const faq = req.body;
        try {
            const createdFAQ = await faqService.createFAQ(faq);
            res.status(200).json({
                msg: "The FAQ is created successfully",
                data: createdFAQ
            });
            return;
        } catch (error) {
            console.log(error);
            res.status(500).json({
                msg: "Internal Server Error"
            });
            return;
        }
    }
};



