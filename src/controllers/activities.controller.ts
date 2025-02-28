import { Request, Response } from "express";
import CreateActivityService from "../services/activities.service";

const createActivityService = new CreateActivityService();

const createActivity = async (req: Request, res: Response): Promise<void> => {
    try {
        const newActivity = await createActivityService.createActivity(req.body);
        res.status(200).json({ mesage: "Successfully", data: newActivity });
    } catch (error: unknown) {
        res.status(500).json({
            message: "An internal server error occurred",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};

export default createActivity;