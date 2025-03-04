import db from "../utils/db.util";
import { Activity } from "../types/activity";

export default {
    async updateActivity(id: string, activity: Partial<Activity>) {
        const updatedActivity = await db("activity")
            .where("activity_id", id)
            .update(activity)
            .returning("*");

        if (updatedActivity.length === 0) return null;
        return updatedActivity;
    }
};
