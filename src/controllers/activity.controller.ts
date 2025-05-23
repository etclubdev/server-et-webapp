import { Request, Response } from "express";

import activityService from "../services/activity.service";

export default {
    getActivityById: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;

            const activity = await activityService.getActivityById(id);

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
    },

    getAllActivities: async (req: Request, res: Response) => {
        try {
            const activities = await activityService.getAllActivities();

            if (!activities || (activities.ongoing.length === 0 && Object.keys(activities.completed).length === 0)) {
                res.status(404).json({
                    message: "No activities found!",
                    data: {
                        ongoing: [],
                        completed: {}
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
    },
    deleteActivity: async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;

        try {
            const deletedActivity = await activityService.deleteActivityById(id);

            if (deletedActivity === 0) {
                res.status(404).json({
                    message: "The activity post is not found"
                });
                return;
            }

            res.status(204).json();
            return;
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Internal Server Error"
            });
            return;
        }
    },
    deleteActivities: async (req: Request, res: Response): Promise<void> => {
        const { activities } = req.body;

        try {
            const deletedActivities = await activityService.deleteActivities(activities);

            if (deletedActivities === 0) {
                res.status(404).json({
                    message: "Activity not found"
                });
                return;
            }

            res.status(204).json();
            return;
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Internal Server Error" + error.message
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
                    message: "Activity not found or no changes applied"
                });
                return;
            }

            res.status(200).json({
                message: "The activity is updated successfully",
                affected: updatedActivity
            });
            return;

        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Internal Server Error"
            });
            return;
        }
    },

    createActivity: async (req: Request, res: Response): Promise<void> => {
        const activity = req.body;
        try {
            const createdActivity = await activityService.createActivity(activity);
            res.status(201).json({
                message: "The activity is created successfully",
                data: createdActivity
            });
            return;
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Internal Server Error"
            });
            return;
        }
    },
}
