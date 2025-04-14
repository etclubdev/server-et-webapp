import db from "../utils/db.util";
import { Achievement } from "../types/achievement";

export default {
    createAchievement: async (achievement: Achievement) => {
        return db("achievement")
            .insert(achievement)
            .returning("*");
    },
    getAllAchievements: async () => {
        try {
            const achievements = await db("achievement")
                .select(
                    "achievement_id",
                    "achievement_name",
                    "highlight_number",
                    "visible",
                )

            return achievements.length > 0 ? achievements : null;
        } catch (error) {
            console.error("Error fetching achievements:", error);
            throw new Error("Failed to fetch achievements");
        }
    }
};
