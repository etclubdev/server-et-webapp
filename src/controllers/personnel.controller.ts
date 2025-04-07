import { Request, Response } from "express";
import personnelService from "../services/personnel.service";

export default {

    deleteMultiplePersonnels: async (req: Request, res: Response): Promise<void> => {
        const { personnelIds } = req.body;
        try {

            const affectedRows = await personnelService.deleteMultiplePersonnels(personnelIds);
            if (affectedRows === 0) {
                res.status(404).json({
                    message: "No personnel found to delete",
                });
                return;
            }

            res.status(200).json({
                message: "Personnel deleted successfully",
                data: {
                    affectedRows,
                },
            });
            return;
        } catch (error) {
            console.error("Error deleting multiple personnels:", error);
            res.status(500).json({
                message: "Internal Server Error: " + error.message,
            });
            return;
        }
    },
};