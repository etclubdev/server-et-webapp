import { Request, Response } from "express";
import achievementService from "../services/achievement.service";

export default {
    deleteAchievement: async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;

        try {
            const deletedAchievement = await achievementService.deleteAchievementById(id);

            if (deletedAchievement === 0) {
                res.status(404).json({
                    msg: "The activity post is not found"
                });
                return;
            }

            res.status(200).json({
                msg: "The activity post is deleted successfully",
                affected: deletedAchievement
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