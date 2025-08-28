import { Request, Response, RequestHandler } from "express";

import faqService from "../services/faq.service";


export default {
    getAllFAQs: (async (req: Request, res: Response): Promise<void> => {
        try {
            const faq_category = req.query.faq_category?.toString();
            const validCategories = [
                "Về ET Club",
                "Về hoạt động và sự kiện",
                "Về quy trình tham gia",
                "Khác"
            ];

            if (faq_category && !validCategories.includes(faq_category)) {
                res.status(400).json({
                    message: `faq_category must be one of: ${validCategories.join(", ")}`
                });
                return;
            }

            const groupedFAQs = faq_category
                ? await faqService.getFAQsByCategory(faq_category)
                : await faqService.getAllFAQs();

            const allEmpty = Object.values(groupedFAQs).every(
                (group) => Array.isArray(group) && group.length === 0
            );


            if (allEmpty) {
                res.status(404).json({
                    message: "No FAQs found!",
                    data: groupedFAQs
                });
                return;
            }

            res.status(200).json({
                message: "Successfully retrieved FAQs",
                data: groupedFAQs
            });
            return;

        } catch (error) {
            console.error("Error retrieving FAQs:", error);
            res.status(500).json({
                message: "Internal Server Error: " + error.message
            });
            return;
        }
    }) as RequestHandler,


    createFAQ: async (req: Request, res: Response) => {
        const faq = req.body;
        try {
            const createdFAQ = await faqService.createFAQ(faq);
            res.status(201).json({
                message: "The FAQ is created successfully",
                data: createdFAQ
            });
            return;
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Internal Server Error"
            });
            return;
        }
    },
    getFAQById: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;

            const faq = await faqService.getFAQById(id);

            if (!faq) {
                res.status(404).json({
                    message: "The FAQ does not exist",
                    data: null
                });
                return;
            }

            res.status(200).json({
                message: "Successfully retrieved FAQ",
                data: faq
            });
            return;

        } catch (error) {
            console.error("Error retrieving FAQ:", error);
            res.status(500).json({
                message: "Internal Server Error: " + error.message
            });
            return;
        }
    },
    updateFAQ: async (req: Request, res: Response) => {
        const { id } = req.params;
        const faqData = req.body;

        try {
            const updatedFAQ = await faqService.updateFAQ(id, faqData);

            if (!updatedFAQ) {
                res.status(404).json({
                    message: "FAQ not found or no changes applied"
                });
                return;
            }

            res.status(200).json({
                message: "The FAQ is updated successfully",
                affected: updatedFAQ
            });
            return;
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Internal Server Error"
            });
            return;
        }
    },
    deleteFAQ: async (req: Request, res: Response) => {
        const { id } = req.params;

        try {
            const deletedFAQ = await faqService.deleteFAQById(id);

            if (deletedFAQ === 0) {
                res.status(404).json({
                    message: "The FAQ is not found"
                });
                return;
            }

            res.status(204).json();
            return;
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Internal Server Error"
            });
            return;
        }
    },

    deleteFAQs: async (req: Request, res: Response) => {
        const { faqs } = req.body;

        if (!faqs || !Array.isArray(faqs) || faqs.length === 0) {
            res.status(400).json({
                message: "Invalid Data"
            });
            return;
        }

        try {
            const deletedFAQs = await faqService.deleteFAQs(faqs);

            if (deletedFAQs === 0) {
                res.status(404).json({
                    message: "Not found"
                });
                return;
            }

            res.status(204).json()
            return;
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Internal Server Error" + error.message
            });
            return;
        }

    }

};