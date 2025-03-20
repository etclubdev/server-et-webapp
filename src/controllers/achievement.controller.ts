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
};
