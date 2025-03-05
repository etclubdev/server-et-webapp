import { Request, Response } from "express";
import getActivityService from "../services/activity.service";

export default {
    getActivityById: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;

            const activity = await getActivityService.getActivityById(id);

            if (!activity) {
                res.status(404).json({
                    message: "The activity does not exist",
                    data: null
                });
                return;
            }

            res.status(200).json({
                message: "Successfully",
                data: activity
            });
            return;

        } catch (error) {
            console.error("Error retrieving activity:", error);
            res.status(500).json({
                message: "Internal Server Error: " + error.message
            });
            return;
        }
    }
};
