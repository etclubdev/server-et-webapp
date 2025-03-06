import { Request, Response } from "express";
import faqService from "../services/faq.service";

const deleteFAQ = async (req: Request, res: Response): Promise<void> => {
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
};

export default deleteFAQ;
