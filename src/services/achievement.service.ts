import db from "../utils/db.util";
import { Achievement } from "../types/achievement";

export default {
    updateAchievement: async (id: string, achievement: Achievement) => {
        const updatedAchievement = await db("achievement")
            .where("achievement_id", id)
            .update(achievement)
            .returning("*");

        if (updatedAchievement.length === 0) return null;
        return updatedAchievement;
    }
}