import { Request, Response } from "express";

import applicationService from "../services/application.service";

export default {
    approveApplication: async (req: Request, res: Response) => {
        const reviewed_by = req.user?.personnel_id;
        const { ids } = req.body;
        const updatedApplications = await applicationService.approveApplication(reviewed_by, ids);
        try {
            if (updatedApplications.length === 0 || !updatedApplications) {
                res.status(404).json({
                    message: "No applications were updated"
                });
                return;
            }

            res.status(200).json({
                message: "Applications approved successfully",
                data: updatedApplications
            });
            return;
        } catch (error) {
            if (error.message === 'Some applications not found') {
                res.status(404).json({
                    message: error.message
                });
                return;
            }
            res.status(500).json({
                message: "Internal server error",
                error: (error as Error).message
            });
            return;
        }
    },
    rejectApplication: async (req: Request, res: Response) => {
        const reviewed_by = req.user?.personnel_id;
        const { ids } = req.body;
        try {
            const updatedApplications = await applicationService.rejectApplication(reviewed_by, ids);
            res.status(200).json({
                message: "Applications rejected successfully",
                data: updatedApplications
            });
            return;
        } catch (error) {
            if (error.message === 'No applications to reject') {
                res.status(404).json({
                    message: error.message
                });
                return;
            }
            if (error.message === 'Some applications not found') {
                res.status(404).json({
                    message: error.message
                });
                return;
            }
            if (error.message === 'Cannot reject an already approved application') {
                res.status(409).json({
                    message: error.message
                });
                return;
            }
            res.status(500).json({
                message: "Internal server error" + error.message,
            });
            return;
        }
    }
}