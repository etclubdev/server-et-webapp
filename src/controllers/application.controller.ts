import { Request, Response } from "express";

import applicationService from "../services/application.service";

const isAdministrator = (sysrole_name) => {
    return sysrole_name === 'Administrator';
}

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
    deleteApplications: async (req: Request, res: Response) => {
        const applicationIds = (req.query.ids as string).split(",");
        try {
            const deletedCount = await applicationService.deleteApplications(applicationIds);

            if (!deletedCount || deletedCount === 0) {
                res.status(404).json({
                    message: "No applications were deleted"
                });
                return;
            }

            res.status(204).end();
            return;
        }
        catch (error) {
            res.status(500).json({
                message: "Internal server error",
                error: (error as Error).message
            });
            return;
        }
    },
    getApplicationById: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const application = await applicationService.getApplicationById(id);
            if (!application) {
                res.status(404).json({
                    message: "Application not found"
                });
                return;
            }
            res.status(200).json({
                message: "Application retrieved successfully",
                data: application
            });
        } catch (error) {
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

            const filters: { round?: number; status?: string[]; department_name?: string[] } = {};

            if (round !== undefined) {
                filters.round = Number(round);
            }

            if (status !== undefined) {
                filters.status = Array.isArray(status)
                    ? status.map(String)
                    : String(status).split(",");
            }

            if (department_name !== undefined) {
                filters.department_name = Array.isArray(department_name)
                    ? department_name.map(String)
                    : String(department_name).split(",");
            }

            if (!isAdministrator(req.user?.sysrole_name)) {
                filters.department_name = [req.user?.department_name as string];
            }

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
    },
    restoreApplication: async (req: Request, res: Response) => {
        const reviewed_by = req.user?.personnel_id;
        const { ids } = req.body;
        try {
            const restoredApplications = await applicationService.restoreApplication(reviewed_by, ids);

            if (!restoredApplications || restoredApplications.length === 0) {
                res.status(404).json({ message: 'No applications found to restore.' });
                return;
            }
            res.status(200).json({
                message: 'Applications restored successfully.',
                data: restoredApplications
            })
            return;
        } catch (error) {
            if (error.message === "Cannot restore application that has been approved in round 3") {
                res.status(409).json({ message: error.message });
                return;
            }
            res.status(500).json({ message: 'Internal Server Error ' + error.message });
            return;
        }
    },
}
