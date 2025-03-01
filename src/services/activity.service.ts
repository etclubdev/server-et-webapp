import db from "../utils/db.util";

class DeleteActivityService {
    async deleteActivityById(activityId: string): Promise<boolean> {
        try {
            const deletedCount = await db("activity_posts").where({ activityId }).del();
            return deletedCount > 0;
        } catch (error) {
            throw new Error("Error deleting activity post: " + error.message);
        }
    }
}

export default DeleteActivityService;
