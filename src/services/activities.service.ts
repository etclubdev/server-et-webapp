import db from "../utils/db.util";
import { Activity } from "../entities/activity.entity";

export default {
    createActivity: async (activity: Activity) => {
        return db("activity")
            .insert(activity)
            .returning("*");
    },
};
