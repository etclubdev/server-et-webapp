import db from "../utils/db.util";
import { Achievement } from "../types/achievement";

export default {
    updateAchievement: async (id: string, achievement: Achievement) => {
        const { achievement_name, highlight_number, visible } = achievement;
        const result = await db.raw(
            `
            UPDATE achievement
            SET achievement_name = ?, highlight_number = ?, visible = ?
            WHERE achievement_id = ?
            RETURNING *
            `,
            [achievement_name, highlight_number, visible, id]
        );
        if (!result.rows || result.rows.length === 0) return null;
        return result.rows;
    },
    deleteAchievementById: async (id: string) => {
        const result = await db.raw(
            `
            DELETE FROM achievement
            WHERE achievement_id = ?
            `,
            [id]
        );
        return result.rowCount;
    },
    deleteAchievements: async (achievements: string[]) => {
        if (!achievements || !Array.isArray(achievements) || achievements.length === 0) {
            throw new Error("Invalid Data");
        }
        return db.transaction(async (trx) => {
            const result = await trx.raw(
                `
                DELETE FROM achievement
                WHERE achievement_id = ANY(?)
                `,
                [achievements]
            );
            return result.rowCount;
        });
    },
    getAchievementById: async (id: string): Promise<Achievement | null> => {
        try {
            const result = await db.raw(
                `
                SELECT achievement_id, achievement_name, highlight_number, visible
                FROM achievement
                WHERE achievement_id = ?
                `,
                [id]
            );
            return result.rows.length > 0 ? result.rows[0] : null;
        } catch (error) {
            console.error("Error getting achievement by ID:", error);
            throw new Error("Error getting achievement: " + error.message);
        }
    },
    createAchievement: async (achievement: Achievement) => {
        const { achievement_name, highlight_number, visible } = achievement;
        const result = await db.raw(
            `
            INSERT INTO achievement (achievement_name, highlight_number, visible)
            VALUES (?, ?, ?)
            RETURNING *
            `,
            [achievement_name, highlight_number, visible]
        );
        return result.rows;
    },
    getAllAchievements: async () => {
        try {
            const result = await db.raw(
                `
                SELECT achievement_id, achievement_name, highlight_number, visible
                FROM achievement
                `
            );
            return result.rows.length > 0 ? result.rows : null;
        } catch (error) {
            console.error("Error fetching achievements:", error);
            throw new Error("Failed to fetch achievements");
        }
    }
};
