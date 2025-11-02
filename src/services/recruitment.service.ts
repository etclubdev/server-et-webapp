import db from '../utils/db.util';
import { Recruitment } from '../types/recruitment';

export default {
    getStatusofFirstRecruitment: async () => {
        const result = await db.raw(
            `SELECT recruitment_id, is_open FROM recruitment
            ORDER BY created_on ASC LIMIT 1`
        );
        return result.rows[0] || null;
    },
    updateStatusOfRecruitment: async (
        id: string
    ): Promise<Recruitment | null> => {
        const existing = await db.raw(
            `SELECT recruitment_id FROM recruitment WHERE recruitment_id = ?`,
            [id]
        );

        const rows = existing.rows || existing;
        if (!rows || rows.length === 0) return null;

        const result = await db.raw(
            `
        UPDATE recruitment 
        SET is_open = NOT is_open
        WHERE recruitment_id = ?
        RETURNING *
        `,
            [id]
        );

        if (!result.rows || result.rows.length === 0) return null;
        return result.rows[0];
    }
}