import db from "../utils/db.util";
import { Achievement } from "../types/achievement";

export default {
    getAchievementById: async (id: string): Promise<Achievement | null> => {
        try {
            const achievement = await db("achievement")
                .select(
                    "achievement_id",
                    "achievement_name",
                    "highlight_number",
                    "visible"
                )
                .where("achievement_id", id);

            return achievement.length > 0 ? achievement[0] : null;
        } catch (error) {
            console.error("Error getting achievement by ID:", error);
            throw new Error("Error getting achievement: " + error.message);
        }
    },
};
