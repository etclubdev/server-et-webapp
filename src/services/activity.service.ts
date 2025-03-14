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
    },
    getAllActivities: async (): Promise<{ ongoing: Activity[]; completed: Activity[] }> => {
        try {
            const now = new Date();

            const ongoing = await db("activity")
                .select("activity_id", "title", "meta_description", "activity_category", "thumbnail_image_url", "start_date", "end_date", "content")
                .where("visible", true)
                .where("start_date", "<=", now)
                .where("end_date", ">=", now);

            const completed = await db("activity")
                .select("activity_id", "title", "meta_description", "activity_category", "thumbnail_image_url", "start_date", "end_date", "content")
                .where("visible", true)
                .where("end_date", "<", now);

            return { ongoing, completed };
        } catch (error) {
            console.log(error);
            throw new Error('Error getting activities: ' + error.message);
        }
    },
    
    deleteActivityById: async (id: string) => {
        return db("activity")
            .where("activity_id", id)
            .del();
    },

    updateActivity: async (id: string, activity: Activity) => {
        const updatedActivity = await db("activity")
            .where("activity_id", id)
            .update(activity)
            .returning("*");

        if (updatedActivity.length === 0) return null;
        return updatedActivity;
    },

    createActivity: async (activity: Activity) => {
        return db("activity")
            .insert(activity)
            .returning("*");
    },
};
