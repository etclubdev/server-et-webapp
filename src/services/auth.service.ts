import db from '../utils/db.util';
import { LoginInfo } from '../types/auth';

export default {
    login: async (loginInfo: LoginInfo) => {
        const result = await db.raw(
            `
            SELECT 
                account.account_id, 
                account.personnel_id, 
                account.username, 
                account.password, 
                account.sysrole_id, 
                system_role.sysrole_name
            FROM account
            JOIN system_role ON account.sysrole_id = system_role.sysrole_id
            WHERE account.username = ?
            `,
            [loginInfo.username]
        );
        if (!result.rows || result.rows.length === 0) return null;
        return result.rows[0];
    }
}