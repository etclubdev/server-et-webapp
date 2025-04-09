import { Request, Response } from "express";
import personnelService from "../services/personnel.service";

export default {

    getPersonnelByStatus: async (req: Request, res: Response): Promise<void> => {
        const { status } = req.params;

        try {
            const personnels = await personnelService.getPersonnelByStatus(status);

            if (!personnels || personnels.length === 0) {
                res.status(404).json({
                    message: "No personnel found with the given status",
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
            console.error("Error retrieving personnels by status:", error);
            res.status(500).json({
                message: "Internal Server Error: " + error.message,
            });
            return;
        }
    },
};