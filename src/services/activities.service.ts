import db from "../utils/db.util";
import { Activity } from "../entities/activity.entity"

class CreateActivityService {
    generateActivityId(activityCount: number): string {
        return `ACT${String(activityCount).padStart(3, '0')}`;
    }
    async createActivity(activity: Activity) {
        const { title, category, metaDescription, thumbnailImage, startDate, endDate, visible, content } = activity;
        try {
            const [newActivity] = await db("activity_posts")
                .insert({
                    activityId: this.generateActivityId(await db("activity_posts")
                        .count("activityId as count")
                        .then(res => Number(res[0].count) + 1)),
                    title,
                    category,
                    metaDescription,
                    thumbnailImage,
                    startDate,
                    endDate,
                    visible,
                    content,

                })
                .returning("*");

            return newActivity;
        } catch (error) {
            throw new Error("Error creating activity: " + error.message);
        }
    }
}

export default CreateActivityService;

