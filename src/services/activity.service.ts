import db from "../utils/db.util";
import { Activity } from "../types/activity";

export default {
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
