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
    createPersonnelWithStatus: async (req: Request, res: Response): Promise<void> => {
        const { personnel, status } = req.body;

        try {
            const created = await personnelService.createPersonnelWithStatus(personnel, status);
            res.status(201).json({
                msg: "Personnel and status created successfully",
                data: created
            });
            return;
        } catch (error) {
            console.error("Error creating personnel with status:", error);
            res.status(500).json({
                msg: "Internal Server Error"
            });
        }
    },
    getPersonnels: async (req: Request, res: Response): Promise<void> => {
        const { status } = req.query;

        try {
            let personnels;

            if (status && typeof status === "string") {
                personnels = await personnelService.getPersonnelByStatus(status);

                if (!personnels || personnels.length === 0) {
                    res.status(404).json({
                        message: "No personnel found with the given status",
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
    
