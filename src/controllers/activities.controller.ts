import { Request, Response } from "express";
import activityService from "../services/activities.service";

export default {
    getAllActivities: async (req: Request, res: Response) => {
        try {
            const activities = await activityService.getAllActivities();

            if (!activities || (activities.ongoing.length === 0 && activities.completed.length === 0)) {
                res.status(404).json({
                    message: "No activities found!",
                    data: {
                        ongoing: [],
                        completed: []
                    }
                });
                return;
            }

            res.status(200).json({
                message: "Successfully",
                data: activities
            });
            return;

        } catch (error) {
            console.error("Error retrieving activities:", error);
            res.status(500).json({
                message: "Internal Server Error: " + error.message
            });
            return;
        }
    }
};

