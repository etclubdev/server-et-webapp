import { Request, Response } from "express";
import ActivityService from "../services/activities.service";

const getAllActivities = async (req: Request, res: Response): Promise<void> => {
    try {
        const activities = await ActivityService.getAllActivities();
        res.status(200).json({ message: "Successfully retrieved", data: activities });
    } catch (error: unknown) {
        res.status(500).json({
            message: "An internal server error occured",
            error: error instanceof Error ? error.message : "Unknown error",
        })
    }
};

export default getAllActivities; 