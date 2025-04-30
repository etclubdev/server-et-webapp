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
    },
    deleteAchievementById: async (id: string) => {
        return db("achievement")
            .where("achievement_id", id)
            .del();
    },
    deleteAchievements: async (achievements: string[]) => {
        if (!achievements || !Array.isArray(achievements) || achievements.length === 0) {
            throw new Error("Invalid Data");
        }

        return db.transaction(async (trx) => {
            let affectedRows = 0;
            for (const achievementId of achievements) {

                const deletedAchivement = await trx("achievement")
                    .where('achievement_id', achievementId)
                    .del();
                affectedRows += deletedAchivement;
            }

            return affectedRows;
        });
    },
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
