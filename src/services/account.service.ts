import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

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
    },
    resetPassword: async (account_id: string) => {
        const user = await db.raw(`
            SELECT account.username, personnel.personnel_name, system_role.sysrole_name 
            FROM account
            JOIN personnel ON personnel.personnel_id = account.personnel_id
            JOIN system_role ON system_role.sysrole_id = account.sysrole_id
            WHERE account.account_id = ?
            `, [account_id]).then(res => res.rows[0]);

        if (!user) {
            return null;
        }

        const password = uuidv4().slice(0, 12);
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await db.raw("UPDATE account SET password = ? WHERE account_id = ?", [hashedPassword, account_id]);

        return { 
            success: true, 
            message: 'Successfully', 
            data: {
                user,
                newPassword: password
            }
        };
    }
};