import { Request, Response } from "express";
import GetActivityService from "../services/activity.service";

const getActivityService = new GetActivityService();

const getActivityById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params
        if (!id || typeof id !== "string") {
            res.status(400).json({ message: "Invalid activity ID format." });
            return;
        }

        const activity = await getActivityService.getActivityById(id);

        if (!activity) {
            res.status(404).json({ message: "Activity post not found." });
            return;
        }

        res.status(200).json({ message: "Successfully", data: activity })
    } catch (error) {
        if (error.message.includes("Requested range not satisfiable")) {
            res.status(416).json({ message: error.messgae });
            return;
        }
        res.status(500).json({
            message: "An internal server error occurred",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};

export default getActivityById; 
