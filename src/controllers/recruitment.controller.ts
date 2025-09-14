import { Request, Response } from "express";

import recruitmentService from "../services/recruitment.service";

export default {
    getStatusofFirstRecruitment: async (req: Request, res: Response): Promise<void> => {
        try {
            const status = await recruitmentService.getStatusofFirstRecruitment();
            if (status === null) {
                res.status(404).json({
                    message: "No recruitment found",
                    data: null
                });
                return;
            }
            res.status(200).json({
                message: "Retrieved status of first recruitment successfully",
                data: status
            });
            return;
        } catch (error) {
            res.status(500).json({
                message: "Internal server error",
                error: (error as Error).message
            });
            return
        }
    },
    updateStatusOfRecruitment: async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const updatedRecruiment = await recruitmentService.updateStatusOfRecruitment(id);
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
