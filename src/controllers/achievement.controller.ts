import { Request, Response } from "express";
import achievementService from "../services/achievement.service";

export default {
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
