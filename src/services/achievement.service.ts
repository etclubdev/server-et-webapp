import db from "../utils/db.util";

export default {
    deleteAchievementById: async (id: string) => {
        return db("achievement")
            .where("achievement_id", id)
            .del();
    }
}; 