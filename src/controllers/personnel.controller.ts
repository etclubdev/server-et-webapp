import { Request, Response } from "express";
import personnelService from "../services/personnel.service";

export default {
    getPersonnels: async (req: Request, res: Response): Promise<void> => {
        const { status, departmentName } = req.query; // Lấy status và departmentName từ query parameters

        try {
            let personnels;
            if (departmentName && typeof departmentName === "string") {

                personnels = await personnelService.getPersonnelByDepartment(departmentName);

                if (!personnels || personnels.length === 0) {
                    res.status(404).json({
                        message: "No personnel found in the given department",
                        data: [],
                    });
                    return;
                }
            } else {

                personnels = await personnelService.getAllPersonnel();

                if (!personnels || personnels.length === 0) {
                    res.status(404).json({
                        message: "No personnel found",
                        data: [],
                    });
                    return;
                }
            }

            res.status(200).json({
                message: "Successfully retrieved personnels",
                data: personnels,
            });
            return;
        } catch (error) {
            console.error("Error retrieving personnels:", error);
            res.status(500).json({
                message: "Internal Server Error: " + error.message,
            });
            return;
        }
    },
};