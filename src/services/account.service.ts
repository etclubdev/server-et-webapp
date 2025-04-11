import bcrypt from 'bcrypt';

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
    },
    updateAccount: async (id: string, sysrole_id: string) => {
        const updatedAccount = await db('account')
            .where('account_id', id)
            .update('sysrole_id', sysrole_id)
            .returning(['account_id', 'sysrole_id', 'personnel_id', 'created_on', 'last_modified_on']);

        if (updatedAccount.length === 0)
            return null;
        return updatedAccount;
    },
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
    updatePassword: async (account_id: string, oldPassword: string, newPassword: string) => {
        const user = await db('account').where('account_id', account_id).first();

        if (!user) {
            return null
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return { success: false, message: 'Old password is incorrect' };
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await db('account').where('account_id', account_id).update({ password: hashedPassword });

        return { success: true, message: 'Successfully' };
    }
};