import db from "../utils/db.util";
import { Activity } from "../entities/activity.entities";

class GetActivityService {
    async getActivityById(activityId: string): Promise<Activity | null> {
        try {
            const activity = await db("activity_posts").where({ activityId }).first();

            if (!activity) {
                return null;
            }
            if (!activity.visible) {
                throw new Error("Requested range not satisfiable. Activity is not visible.");
            }
            return activity;
        } catch (error) {
            throw new Error("Error fetching activity: " + error.message);
        }
    }
}

export default GetActivityService; 