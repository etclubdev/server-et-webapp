import db from '../utils/db.util';
import { Account } from '../types/account';

export default {
    createAccount: async (account: Account) => {
        return db.transaction(async (trx) => {
            const [newAccount] = await trx('account')
                .insert(account)
                .returning('*'); 

            return trx('account')
                .select('account.*', 'personnel.*', 'system_role.sysrole_name')
                .join('personnel', 'account.personnel_id', 'personnel.personnel_id')
                .join('system_role', 'account.sysrole_id', 'system_role.sysrole_id')
                .where('account.account_id', newAccount.account_id)
                .first();
        });
    },
};