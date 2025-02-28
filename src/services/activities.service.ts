import db from "../utils/db.util";
import { Activity } from "../entities/activity.entities"

class ActivityService {
    async getAllActivities(): Promise<{ ongoing: Activity[]; completed: Activity[] }> {
        const now = new Date();

        const ongoing = await db("activities")
            .select("id", "tiltle", "metaDescription", "category", "thumbnail", "startDate", "endDate", "content")
            .where("visible", true)
            .where("startDate", "<=", now)
            .where("endDAte", ">=", now);

        const completed = await db("activities")
            .select("id", "tiltle", "metaDescription", "category", "thumbnail", "startDate", "endDate", "content")
            .where("visible", true)
            .where("endDAte", "<", now);

        return { ongoing, completed };
    }
}

export default new ActivityService(); 
