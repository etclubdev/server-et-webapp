import db from "../utils/db.util";
import { Activity } from "../types/activity";

export default {
    getActivityById: async (id: string): Promise<Activity | null> => {
        try {
            const result = await db.raw(
                `
                SELECT *
                FROM activity
                WHERE activity_id = ?
                `,
                [id]
            );
            return result.rows.length > 0 ? result.rows[0] : null;
        } catch (error) {
            console.log(error);
            throw new Error('Error getting activities: ' + error.message);
        }
    },
    getAllActivities: async (categories?: string[]): Promise<{ ongoing: Activity[]; completed: Record<string, Activity[]> }> => {
        try {
            const now = new Date();
            let ongoingResult, completedResult;
            if (Array.isArray(categories) && categories.length > 0) {
                ongoingResult = await db.raw(
                    `
                    SELECT *
                    FROM activity
                    WHERE start_date <= ? AND end_date >= ? AND activity_category = ANY(?)
                    `,
                    [now, now, categories]
                );
                completedResult = await db.raw(
                    `
                    SELECT *
                    FROM activity
                    WHERE end_date < ? AND activity_category = ANY(?)
                    `,
                    [now, categories]
                );
            } else {
                ongoingResult = await db.raw(
                    `
                    SELECT *
                    FROM activity
                    WHERE start_date <= ? AND end_date >= ?
                    `,
                    [now, now]
                );
                completedResult = await db.raw(
                    `
                    SELECT *
                    FROM activity
                    WHERE end_date < ?
                    `,
                    [now]
                );
            }
            const completed: Record<string, Activity[]> = completedResult.rows.reduce((acc, activity) => {
                const category = activity.activity_category;
                if (!acc[category]) {
                    acc[category] = [];
                }
                acc[category].push(activity);
                return acc;
            }, {} as Record<string, Activity[]>);
            return { ongoing: ongoingResult.rows, completed };
        } catch (error) {
            console.log(error);
            throw new Error('Error getting activities: ' + error.message);
        }
    },

    deleteActivityById: async (id: string) => {
        const result = await db.raw(
            `
            DELETE FROM activity
            WHERE activity_id = ?
            `,
            [id]
        );
        return result.rowCount;
    },

    deleteActivities: async (activities: string[]) => {
        if (!activities || !Array.isArray(activities) || activities.length === 0) {
            throw new Error("Invalid Data");
        }
        return db.transaction(async (trx) => {
            const result = await trx.raw(
                `
                DELETE FROM activity
                WHERE activity_id = ANY(?)
                `,
                [activities]
            );
            return result.rowCount;
        });
    },

    updateActivity: async (id: string, activity: Activity) => {
        const {
            title,
            activity_category,
            meta_description,
            thumbnail_image_url,
            start_date,
            end_date,
            register_number,
            participated_number,
            expense_money,
            visible,
            content
        } = activity;
        const result = await db.raw(
            `
            UPDATE activity
            SET title = ?, activity_category = ?, meta_description = ?, thumbnail_image_url = ?,
                start_date = ?, end_date = ?, register_number = ?, participated_number = ?,
                expense_money = ?, visible = ?, content = ?
            WHERE activity_id = ?
            RETURNING *
            `,
            [
                title,
                activity_category,
                meta_description,
                thumbnail_image_url,
                start_date,
                end_date,
                register_number,
                participated_number,
                expense_money,
                visible,
                content,
                id
            ]
        );
        if (!result.rows || result.rows.length === 0) return null;
        return result.rows;
    },

    createActivity: async (activity: Activity) => {
        const {
            title,
            activity_category,
            meta_description,
            thumbnail_image_url,
            start_date,
            end_date,
            register_number,
            participated_number,
            expense_money,
            visible,
            content,
        } = activity;
        const result = await db.raw(
            `
            INSERT INTO activity (
                title, activity_category, meta_description, thumbnail_image_url,
                start_date, end_date, register_number, participated_number,
                expense_money, visible, content
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            RETURNING *
            `,
            [
                title,
                activity_category,
                meta_description,
                thumbnail_image_url,
                start_date,
                end_date,
                register_number,
                participated_number,
                expense_money,
                visible,
                content
            ]
        );
        return result.rows;
    },
};