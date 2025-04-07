import { Request, Response } from "express";
import personnelService from "../services/personnel.service";

export default {


    getPersonnelByDepartment: async (req: Request, res: Response): Promise<void> => {
        const { departmentName } = req.params;

        try {
            const personnels = await personnelService.getPersonnelByDepartment(departmentName);

            if (!personnels || personnels.length === 0) {
                res.status(404).json({
                    message: "No personnel found in the given department",
                    data: [],
                });
                return;
            }

            res.status(200).json({
                message: "Successfully retrieved personnels",
                data: personnels,
            });
            return;
        } catch (error) {
            console.error("Error retrieving personnels by department:", error);
            res.status(500).json({
                message: "Internal Server Error: " + error.message,
            });
            return;
        }
    },
};