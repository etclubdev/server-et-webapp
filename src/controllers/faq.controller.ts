import { Request, Response } from "express";
import faqService from "../services/faq.service";

const updateFAQ = async (req: Request, res: Response): Promise<void> => {
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
};

export default updateFAQ;