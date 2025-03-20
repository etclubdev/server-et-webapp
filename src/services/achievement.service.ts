import db from "../utils/db.util";

export default {
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
