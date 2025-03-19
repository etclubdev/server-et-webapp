import db from '../utils/db.util';

export default {
    getAccountById: async(id: string) => {
        const account = await db('account')
        .select('account_id', 'username', 'sysrole_id', 'created_on', 'last_modified_on')
        .where('account_id', id)

        if(account.length === 0) {
            return null;
        }

        return account[0];
    }
}