import { Request, Response, RequestHandler } from "express";
import faqService from "../services/faq.service";


export default {
    getAllFAQs: (async (req: Request, res: Response): Promise<void> => {
        try {
            const groupedFAQs = await faqService.getAllFAQs();

            if (
                groupedFAQs.aboutETClub.length === 0 &&
                groupedFAQs.aboutActivities.length === 0 &&
                groupedFAQs.aboutMembership.length === 0 &&
                groupedFAQs.others.length === 0
            ) {
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
                    msg: "FAQ not found or no changes applied"
                });
                return;
            }

            res.status(200).json({
                msg: "The FAQ is updated successfully",
                affected: updatedFAQ
            });
            return;
        } catch (error) {
            console.error(error);
            res.status(500).json({
                msg: "Internal Server Error"
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
                    msg: "The FAQ is not found"
                });
                return;
            }

            res.status(200).json({
                msg: "The FAQ is deleted successfully",
                affected: deletedFAQ
            });
            return;
        } catch (error) {
            console.error(error);
            res.status(500).json({
                msg: "Internal Server Error"
            });
            return;
        }
    }

};