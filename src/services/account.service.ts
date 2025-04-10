import db from '../utils/db.util';

export default {
    getAllAccount: async () => {
        const accounts = await db('account')
            .select('account_id', 'username', 'personnel_id', 'sysrole_id', 'created_on', 'last_modified_on')
            .orderBy('sysrole_id');

        if (accounts.length === 0) {
            return null;
        }

        return accounts;
    }
};
