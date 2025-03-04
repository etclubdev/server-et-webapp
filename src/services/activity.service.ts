import db from "../utils/db.util";
import { Activity } from "../types/activity";

class GetActivityService {
    async getActivityById(id: string): Promise<Activity | null> {
        const activity = await db("activity")
            .select(

                "title", "meta_description", "start_date", "end_date", "visible"
            )
            .where("activity_id", id);

        if (activity.length === 0) {
            return null;
        }
        return activity[0];
    }
}

export default GetActivityService;
