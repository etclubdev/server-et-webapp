import { Request, Response } from "express";
import achievementService from "../services/achievement.service";

export default
    {
        updateAchievement: async (req: Request, res: Response): Promise<void> => {
            const { id } = req.params;
            const achievementData = req.body;

            try {
                const updatedAchievement = await achievementService.updateAchievement(id, achievementData);

                if (!updatedAchievement) {
                    res.status(404).json({
                        msg: "Achievement not found or no changes applied"
                    });
                    return;
                }

                res.status(200).json({
                    msg: "The achivement is updated successfully",
                    affected: updatedAchievement
                });
                return;

            } catch (error) {
                console.error(error);
                res.status(500).json({
                    msg: "Internal Server Error"
                });
                return;
            }
        }
    }