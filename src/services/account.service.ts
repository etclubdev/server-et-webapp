import bcrypt from 'bcrypt';

import db from '../utils/db.util';
import { Account } from '../types/account';

export default {
    createAccount: async (account: Account) => {
        return db.transaction(async (trx) => {
            const insertResult = await trx.raw(
                `
                INSERT INTO account (username, password, sysrole_id)
                VALUES (?, ?, ?)
                RETURNING *
                `,
                [
                    account.username,
                    account.password,
                    account.sysrole_id
                ]
            );
            const newAccount = insertResult.rows[0];

            const selectResult = await trx.raw(
                `
                SELECT a.*, sr.sysrole_name
                FROM account a
                JOIN system_role sr ON a.sysrole_id = sr.sysrole_id
                WHERE a.account_id = ?
                `,
                [newAccount.account_id]
            );
            return selectResult.rows[0];
        });
    },
    getAccountById: async (id: string) => {
        const result = await db.raw(
            `
            SELECT a.*, sr.sysrole_name
            FROM account a
            JOIN system_role sr ON a.sysrole_id = sr.sysrole_id
            WHERE a.account_id = ?
            `,
            [id]
        );
        if (!result.rows || result.rows.length === 0) {
            return null;
        }
        return result.rows[0];
    },
    getAllAccount: async () => {
        const result = await db.raw(
            `
            SELECT a.*, sr.sysrole_name
            FROM account a
            JOIN system_role sr ON a.sysrole_id = sr.sysrole_id
            ORDER BY a.sysrole_id
            `
        );
        if (!result.rows || result.rows.length === 0) {
            return null;
        }
        return result.rows;
    },
    updateAccount: async (id: string, sysrole_id: string) => {
        const result = await db.raw(
            `
            UPDATE account
            SET sysrole_id = ?
            WHERE account_id = ?
            RETURNING *
            `,
            [sysrole_id, id]
        );
        if (!result.rows || result.rows.length === 0) return null;
        const account = result.rows[0];
        const sysroleResult = await db.raw(
            `SELECT sysrole_name FROM system_role WHERE sysrole_id = ?`,
            [account.sysrole_id]
        );
        return { ...account, sysrole_name: sysroleResult.rows[0]?.sysrole_name };
    },
    deleteAccount: async (id: string) => {
        const result = await db.raw(
            `DELETE FROM account WHERE account_id = ?`,
            [id]
        );
        return result.rowCount;
    },
    deleteAccounts: async (accounts: string[]) => {
        if (!accounts || !Array.isArray(accounts) || accounts.length === 0) {
            throw new Error("Invalid Data");
        }
        return db.transaction(async (trx) => {
            const result = await trx.raw(
                `DELETE FROM account WHERE account_id = ANY(?)`,
                [accounts]
            );
            return result.rowCount;
        });
    },
    updatePassword: async (account_id: string, oldPassword: string, newPassword: string) => {
        const result = await db.raw(
            `SELECT * FROM account WHERE account_id = ? LIMIT 1`,
            [account_id]
        );
        const user = result.rows[0];
        if (!user) {
            return null;
        }
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return { success: false, message: 'Old password is incorrect' };
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await db.raw(
            `UPDATE account SET password = ? WHERE account_id = ?`,
            [hashedPassword, account_id]
        );
        return { success: true, message: 'Successfully' };
    }
};