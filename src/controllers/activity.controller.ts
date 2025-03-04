import { Request, Response } from "express";
import GetActivityService from "../services/activity.service";

const getActivityService = new GetActivityService();

const getActivityById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const activity = await getActivityService.getActivityById(id);

        if (activity === null) {
            res.status(404).json({ error: "The activity does not exist" });
            return;
        }

        res.status(200).json({ success: true, data: activity });
        return;

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
        return;
    }
};

export default getActivityById;
