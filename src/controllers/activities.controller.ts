import { Request, Response } from 'express';
import selectActivityService from '../services/activities.service';

const selectActivitybyID = async (req: Request, res: Response) => {
    try {
        const { activityid } = req.params;

        const activity = await selectActivityService.selectbyID(activityid);

        if (!activity) {
            res.status(404).json({ message: "Activity not found." });
            return;
        }

        res.status(200).json({
            message: "Successfully",
            data: activity,
        });
        return;
    } catch (error) {
        res.status(500).json({
            message: 'An internal server error occurred',
            error: error instanceof Error ? error.message : "Unknown error",
        })
        return;
    }
}

export default selectActivitybyID;
