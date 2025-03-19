import { Request, Response } from "express";
import achievementService from "../services/achievement.service";

export default {
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
}