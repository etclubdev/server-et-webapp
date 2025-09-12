import db from '../utils/db.util';
import { Recruitment } from '../types/recruitment';

export default {
    updateFirstRecruitment: async (data: Partial<Recruitment>): Promise<Recruitment | null> => {
        const firstRow = await db.raw(
            `SELECT recruitment_id FROM recruitment ORDER BY created_at ASC LIMIT 1`
        );

        const rows = firstRow.rows || firstRow;
        if (!rows || rows.length === 0)
            return null;
        const recruitment_id = rows[0].recruitment_id;

        const { is_open } = data;

        const result = await db.raw(
            `
            UPDATE recruitment 
            SET 
            is_open = COALESCE(?, is_open)
            WHERE recruitment_id = ?
            RETURNING *
            `,
            [is_open, recruitment_id]
        );
        if (!result.rows || result.rows.length === 0) return null;
        return result.rows[0];
    }
}