import db from "../utils/db.util";
import { Activity } from "../types/activity";

export default {
    getActivityById: async (id: string): Promise<Activity | null> => {
        try {
            const activity = await db("activity")
                .select("*")
                .where("activity_id", id);

            return activity.length > 0 ? activity[0] : null;
        } catch (error) {
            console.log(error);
            throw new Error('Error getting activities: ' + error.message);
        }
    },
    getAllActivities: async (): Promise<{ ongoing: Activity[]; completed: Record<string, Activity[]> }> => {
        try {
            const now = new Date();

            const ongoing = await db("activity")
                .select("*")
                .where("start_date", "<=", now)
                .where("end_date", ">=", now);

            const completedRaw = await db("activity")
                .select("*")
                .where("end_date", "<", now);

            const completed: Record<string, Activity[]> = completedRaw.reduce((acc, activity) => {
                const category = activity.activity_category;
                if (!acc[category]) {
                    acc[category] = [];
                }
                acc[category].push(activity);
                return acc;
            }, {} as Record<string, Activity[]>);

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
