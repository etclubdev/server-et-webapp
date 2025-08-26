import db from '../utils/db.util';

export default {
    getAllSystemRole: async () => {
        const result = await db.raw(`SELECT * FROM system_role`);
        const systemRole = result.rows;

        if (!systemRole || systemRole.length === 0) {
            return null;
        }
        return systemRole;
    }
}