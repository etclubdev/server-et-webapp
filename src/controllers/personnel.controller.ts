import { Request, Response } from "express";
import personnelService from "../services/personnel.service";

export default {

    deletePersonnel: async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;

        try {
            const isDeleted = await personnelService.deletePersonnel(id);

            if (!isDeleted) {
                res.status(404).json({
                    message: "Personnel not found",
                });
                return;
            }

            res.status(200).json({
                message: "Personnel deleted successfully",
            });
            return;
        } catch (error) {
            console.error("Error deleting personnel:", error);
            res.status(500).json({
                message: "Internal Server Error: " + error.message,
            });
            return;
        }
    },
};