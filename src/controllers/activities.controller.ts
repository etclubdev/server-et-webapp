import { Request, Response } from "express";
import ActivityService from "../services/activities.service";

const getAllActivities = async (req: Request, res: Response): Promise<void> => {
    try {
        const activities = await ActivityService.getAllActivities();

        if (!activities || (activities.ongoing.length === 0 && activities.completed.length === 0)) {
            res.status(404).json({
                msg: "No activities found",
                data: {
                    ongoing: [],
                    completed: []
                }
            });

            return;
        }

        res.status(200).json({
            success: true,
            msg: "Activities retrieved successfully",
            data: { ...activities }
        });
        return;

    } catch (error) {
        console.error("Error retrieving activities:", error);
        res.status(500).json({ error: "Internal Server Error" });
        return;
    }
};

export default getAllActivities;
