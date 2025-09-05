import { Request, Response } from "express";

import applicationService from "../services/application.service";
import { get } from "http";

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
    getApplications: async (req: Request, res: Response) => {
        try {
            const { round, status, department_name } = req.query;

            const filters: { round?: number; status?: string; department_name?: string } = {};

            if (round !== undefined) filters.round = Number(round);
            if (status !== undefined) filters.status = String(status);
            if (department_name !== undefined) filters.department_name = String(department_name);

            const applications = await applicationService.getApplications(filters);

            res.status(200).json({
                message: "Get applications successfully",
                data: applications
            });
        } catch (error) {
            res.status(500).json({
                message: "Internal server error",
                error: (error as Error).message
            });
        }
    },
}