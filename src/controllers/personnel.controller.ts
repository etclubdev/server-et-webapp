import { Request, Response } from "express";
import personnelService from "../services/personnel.service";

export default {
    createPersonnelWithStatus: async (req: Request, res: Response): Promise<void> => {
        const { personnel, status } = req.body;

        try {
            const created = await personnelService.createPersonnelWithStatus(personnel, status);
            res.status(201).json({
                msg: "Personnel and status created successfully",
                data: created
            });
            return;
        } catch (error) {
            console.error("Error creating personnel with status:", error);
            res.status(500).json({
                msg: "Internal Server Error"
            });
        }
    }
};
