import { Request, Response } from "express";
import personnelService from "../services/personnel.service";

export default {

    getPersonnelByID: async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;

        try {
            const personnel = await personnelService.getPersonnelByID(id);

            if (!personnel) {
                res.status(404).json({
                    message: "Personnel not found",
                    data: null
                });
                return;
            }

            res.status(200).json({
                message: "Successfully retrieved personnel",
                data: personnel
            });
            return;

        } catch (error) {
            console.error("Error retrieving personnel:", error);
            res.status(500).json({
                message: "Internal Server Error: " + error.message
            });
            return;
        }
    },
};