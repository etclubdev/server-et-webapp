import db from '../utils/db.util';

export default {
    getAccountById: async (id: string) => {
        const account = await db('account')
            .join('personnel', 'account.personnel_id', 'personnel.personnel_id')
            .select('account_id', 'account.personnel_id', 'personnel.personnel_name', 'personnel.student_id', 'username', 'sysrole_id')
            .where('account_id', id)

        if (account.length === 0) {
            return null;
        }

        return account[0];
    },
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
