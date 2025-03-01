import db from "../utils/db.util";
import { Activity } from "../entities/activity.entity";

class UpdateActivityService {
    async updateActivity(activityId: string, updates: Partial<Activity>) {
        try {
            const existingActivity = await db("activity_posts")
                .where({ activityId })
                .first();
            if (!existingActivity) {
                throw new Error("Activity not found");
            }

            // Update only provided fields
            const updatedActivity = await db("activity_posts")
                .where({ activityId })
                .update({ ...updates, updateAt: new Date() })
                .returning("*");

            return updatedActivity;
        } catch (error) {
            throw new Error("Error updating activity: " + error.message);
        }
    }
}

export default UpdateActivityService; 