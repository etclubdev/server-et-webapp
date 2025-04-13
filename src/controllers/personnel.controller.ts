import { Request, Response } from "express";
import personnelService from "../services/personnel.service";

export default {
    updatePersonnel: async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        const { personnel, status } = req.body;

        try {
            const { personnel: updatedPersonnel, status: updatedStatus } = await personnelService.updatePersonnel(
                id,
                personnel,
                status
            );


            if (!updatedPersonnel && !updatedStatus) {
                res.status(404).json({
                    message: "Personnel and status not found or no changes applied",
                    data: null,
                });
                return;
            }

            res.status(200).json({
                message: "Personnel updated successfully",
                data: {
                    personnel: updatedPersonnel?? null,
                    status: updatedStatus ?? null,
                },
            });
            return;
        } catch (error) {
            console.error("Error updating personnel:", error);
            res.status(500).json({
                message: "Internal Server Error: " + error.message,
            });
            return;
        }
    },
};