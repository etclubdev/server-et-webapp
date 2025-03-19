import db from '../utils/db.util';
import { Account } from '../types/account';

export default {
    updateAccount: async (id: string, account: Account) => {
        const updatedAccount = await db('account')
        .where('account_id', id)
        .update(account)
        .returning('*');

        if(updatedAccount.length === 0) 
            return null;
        return updatedAccount;
    },
}