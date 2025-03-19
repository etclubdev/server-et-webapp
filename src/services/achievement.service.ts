import db from "../utils/db.util";
import { Achievement } from "../types/achievement";

export default {
    createAchievement: async (achievement: Achievement) => {
        return db("achievement")
            .insert(achievement)
            .returning("*");
    }

}