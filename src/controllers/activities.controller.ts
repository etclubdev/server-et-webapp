import { Request, Response } from "express";
import activityService from "../services/activities.service";

const createActivity = async (req: Request, res: Response): Promise<void> => {
    const activity = req.body;
    try {
        const createdActivity = await activityService.createActivity(activity);
        res.status(200).json({
            msg: "The activity is created successfully",
            data: createdActivity
        });
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Internal Server Error"
        });
        return;
    }
};

export default createActivity;
