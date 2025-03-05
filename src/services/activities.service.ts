import db from "../utils/db.util";
import { Activity } from "../types/activity";

export default {
    createActivity: async (activity: Activity) => {
        return db("activity")
            .insert(activity)
            .returning("*");
    },
};
