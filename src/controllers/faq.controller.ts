import { Request, Response } from "express";
import faqService from "../services/faq.service";

export default {
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
    }
};
