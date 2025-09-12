import { Request, Response } from "express";

import recruitmentService from "../services/recruitment.service";

export default {
    updateFirstRecruitment: async (req: Request, res: Response): Promise<void> => {
        try {
            const updatedRecruiment = await recruitmentService.updateFirstRecruitment(req.body);
            if (!updatedRecruiment) {
                res.status(404).json({
                    message: "No recruitment found to update",
                });
                return;
            }
            res.status(200).json({
                message: "Recruitment updated successfully",
                data: updatedRecruiment
            });
            return;
        } catch (error) {
            res.status(500).json({
                message: "Error updating recruitment",
                error: error.message
            });
            return;
        }
    }
};