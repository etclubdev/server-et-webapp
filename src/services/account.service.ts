import db from '../utils/db.util'

export default {
    deleteAccount: async (id: string) => {
        return db('account')
        .where('account_id', id)
        .del();
    },

    deleteAccounts: async (accounts: string[]) => {
        if (!accounts || !Array.isArray(accounts) || accounts.length === 0) {
            throw new Error("Invalid Data");
        }

        return db.transaction(async (trx) => {
            let affectedRows = 0;
            for (const accountId of accounts) {

                const deletedAccount = await trx("account")
                    .where('account_id', accountId)
                    .del();
                affectedRows += deletedAccount;
            }

            return affectedRows;
        });
    },
};