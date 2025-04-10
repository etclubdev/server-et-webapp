import db from '../utils/db.util';

export default {
    getAllSystemRole: async () => {
        const systemRole = await db('system_role')
            .select('*')
            .returning('*')

        if (systemRole.length === 0) {
            return null;
        }
        return systemRole;
    }
}