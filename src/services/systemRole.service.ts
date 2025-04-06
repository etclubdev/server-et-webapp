import db from '../utils/db.util';

export default {
    getSystemRoleIdByName: async (name: string) => {
        const systemRole = await db('system_role')
            .select('*')
            .where('sysrole_name', name);

        if (systemRole.length === 0) {
            return null;
        }
        return systemRole;
    }
}