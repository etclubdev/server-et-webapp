import db from '../utils/db.util';

export default {
    getAccountById: async(id: string) => {
        const account = await db('account')
        .join('personnel', 'account.personnel_id', 'personnel.personnel_id')
        .select('account_id', 'account.personnel_id', 'personnel.personnel_name', 'personnel.student_id', 'username', 'sysrole_id')
        .where('account_id', id)

        if(account.length === 0) {
            return null;
        }

        return account[0];
    }
}