import { Request, Response } from "express";
import UpdateActivityService from "../services/activity.service";


const updateActivityService = new UpdateActivityService();

const updateActivity = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const updatedActivity = await updateActivityService.updateActivity(id, req.body);

        if (!updatedActivity) {
            res.status(404).json({ message: "Activity not found" });
            return;
        }

        res.status(200).json({ message: "Successfully updated", data: updatedActivity });
    } catch (error) {
        res.status(500).json({
            message: "An internal server error occurred",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};

export default updateActivity;
