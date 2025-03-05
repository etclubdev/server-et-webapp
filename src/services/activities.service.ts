import db from "../utils/db.util";
import { Activity } from "../types/activity";

export default {
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
    }
};
