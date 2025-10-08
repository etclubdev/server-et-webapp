import { Request, Response } from "express";
import ExcelJS from 'exceljs';
import applicationService from "../services/application.service";

const isAdministrator = (sysrole_name) => {
    return sysrole_name === 'Administrator';
}

export default {
    approveApplication: async (req: Request, res: Response) => {
        const reviewed_by = req.user?.personnel_id;
        const { ids } = req.body;
        const { isUnique, updatedApplications } = await applicationService.approveApplication(reviewed_by, ids);

        try {
            if (!isUnique && (updatedApplications.length === 0 || !updatedApplications)) {
                res.status(409).json({
                    message: "The email is not available"
                })
                return;
            }

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
    exportApplications: async (req: Request, res: Response) => {
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

            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet("Applications");

            worksheet.columns = [
                { header: "STT", key: "order", width: 6 },
                { header: "Họ tên", key: "full_name", width: 20 },
                { header: "Email", key: "email", width: 25 },
                { header: "Số điện thoại", key: "phone_number", width: 15 },
                { header: "Ngày sinh", key: "dob", width: 15, style: { numFmt: "dd-mm-yyyy" } },
                { header: "Giới tính", key: "gender", width: 10 },
                { header: "MSSV", key: "student_id", width: 20 },
                { header: "Trường", key: "university", width: 30 },
                { header: "Khoa", key: "faculty", width: 30 },
                { header: "Ngành", key: "major", width: 25 },
                { header: "Khóa", key: "cohort_name", width: 25 },
                { header: "Lớp", key: "class", width: 15 },
                { header: "Vòng", key: "round", width: 8 },
                { header: "Trạng thái", key: "application_status", width: 15 },
                { header: "Ban", key: "department_name", width: 20 },
                { header: "Ngày đăng ký", key: "apply_date", width: 20, style: { numFmt: "dd-mm-yyyy" } },
                { header: "Link CV", key: "cv_link", width: 20 },
                { header: "Loại CV", key: "cv_type", width: 20 },
                { header: "Ghi chú", key: "note", width: 20 },
            ];

            applications.forEach((app, index) => worksheet.addRow({
                order: index + 1,
                dob: app.dob ? new Date(app.dob) : null,
                ...app
            }));

            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.setHeader('Content-Disposition', 'attachment; filename=applications.xlsx');

            await workbook.xlsx.write(res);
            res.end();
        } catch (error) {
            res.status(500).json({ message: 'Export failed', error: (error as Error).message });
        }
    },
    statisticsApplication: async (req: Request, res: Response) => {
        try {
            const stats = await applicationService.statisticsApplication();
            if (!stats || Object.keys(stats).length === 0) {
                res.status(404).json({
                    message: 'No statistics found',
                    data: stats
                });
                return;
            }
            res.status(200).json({
                message: 'Statistics retrieved successfully',
                data: stats
            });
            return;
        } catch (error) {
            res.status(500).json({
                message: 'Internal Server Error ' + error.message
            });
            return;
        }
    },
    createApplication: async (req: Request, res: Response) => {
        try {
            const applicationData = req.body;
            const isUnique = await applicationService.checkUniqueEmail(applicationData.email);
            if (!isUnique) {
                res.status(409).json({
                    message: 'The email is not available'
                });
                return;
            }
            const newApplication = await applicationService.createApplication(applicationData);

            res.status(201).json({
                message: 'Application created successfully',
                data: newApplication
            });
            return;
        } catch (error) {
            res.status(500).json({
                message: 'Internal Server Error ' + error.message
            });
            return;
        }
    },
    updateApplicationNote: async (req: Request, res: Response) => {
        const { note } = req.body;
        const { id } = req.params;

        try {
            const updatedApplication = await applicationService.updateApplicationNote(note, id);
            if (!updatedApplication || updatedApplication.length === 0) {
                res.status(404).json({ message: 'No application found to update.' });
                return;
            }
            res.status(200).json({
                message: 'Note updated successfully.',
                data: updatedApplication
            })
            return;
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error ' + error.message });
            return;
        }
    }
}
