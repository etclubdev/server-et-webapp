import { Request, Response } from "express";
import activityService from "../services/activity.service";

const updateActivity = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const activityData = req.body;

    try {
        const updatedActivity = await activityService.updateActivity(id, activityData);

        if (!updatedActivity) {
            res.status(404).json({
                msg: "Activity not found or no changes applied"
            });
            return;
        }

        res.status(200).json({
            msg: "The activity is updated successfully",
            affected: updatedActivity
        });
        return;

    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: "Internal Server Error"
        });
        return;
    }
};

export default updateActivity;
