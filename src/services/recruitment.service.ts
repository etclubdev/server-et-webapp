import db from '../utils/db.util';

export default {
    getStatusofFirstRecruitment: async () => {
        const result = await db.raw(
            `SELECT is_open FROM recruitment
            ORDER BY created_at ASC LIMIT 1`
        );
        return result.rows[0]?.is_open || null;
    }
}