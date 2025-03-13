import { Request, Response } from "express";
import faqService from "../services/faq.service";

const createFAQ = async (req: Request, res: Response): Promise<void> => {
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
};

export default createFAQ;
