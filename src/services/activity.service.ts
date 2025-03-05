import db from "../utils/db.util";
import { Activity } from "../types/activity";

export default {
    getActivityById: async (id: string): Promise<Activity | null> => {
        try {
            const activity = await db("activity")
                .select(
                    "title", "meta_description", "start_date", "end_date", "visible"
                )
                .where("activity_id", id);

            return activity.length > 0 ? activity[0] : null;
        } catch (error) {
            console.log(error);
            throw new Error('Error getting activities: ' + error.message);
        }
    }
};
