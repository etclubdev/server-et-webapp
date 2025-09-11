import db from '../utils/db.util';

export default {
    getStatusofFirstRecruitment: async () => {
        const result = await db.raw(
            `SELECT recruitment_status FROM recruitment
            ORDER BY start_date ASC LIMIT 1`
        );
        return result.rows[0]?.recruitment_status || null;
    }
}