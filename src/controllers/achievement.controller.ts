import { Request, Response } from "express";
import achievementService from "../services/achievement.service";

export default {
    getAchievementById: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;

            const achievement = await achievementService.getAchievementById(id);

            if (!achievement) {
                res.status(404).json({
                    message: "The achievement does not exist",
                    data: null
                });
                return;
            }

            res.status(200).json({
                message: "Successfully retrieved achievement",
                data: achievement
            });
            return;

        } catch (error) {
            console.error("Error retrieving achievement:", error);
            res.status(500).json({
                message: "Internal Server Error: " + error.message
            });
            return;
        }
    },

    createAchievement: async (req: Request, res: Response): Promise<void> => {
        const achievement = req.body;
        try {
            const createdAchievement = await achievementService.createAchievement(achievement);
            res.status(200).json({
                msg: "The achievement is created successfully",
                data: createdAchievement
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

    getAllAchievements: async (req: Request, res: Response) => {
        try {
            const achievements = await achievementService.getAllAchievements();

            if (!achievements || achievements.length === 0) {
                res.status(404).json({
                    message: "No achievements found!",
                    data: []
                });
                return;
            }

            res.status(200).json({
                message: "Successfully retrieved achievements",
                data: achievements
            });
            return;

        } catch (error) {
            console.error("Error retrieving achievements:", error);
            res.status(500).json({
                message: "Internal Server Error: " + (error as Error).message
            });
            return;
        }
    }
};
