import { Request, Response } from "express";
import activityService from "../services/activity.service";

export default {
    deleteActivity: async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
    
        try {
            const deletedActivity = await activityService.deleteActivityById(id);
    
            if (deletedActivity === 0) {
                res.status(404).json({
                    msg: "The activity post is not found"
                });
                return;
            }
    
            res.status(200).json({
                msg: "The activity post is deleted successfully",
                affected: deletedActivity
            });
            return;
        } catch (error) {
            console.error(error);
            res.status(500).json({
                msg: "Internal Server Error"
            });
            return;
        }
    },
    updateActivity: async (req: Request, res: Response): Promise<void> => {
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
    },

    createActivity: async (req: Request, res: Response): Promise<void> => {
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
    },
}
