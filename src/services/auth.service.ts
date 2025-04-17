import db from '../utils/db.util';
import { LoginInfo } from '../types/auth';

export default {
    login: async (loginInfo: LoginInfo) => {
        const user = await db('account')
            .join('system_role', 'account.sysrole_id', 'system_role.sysrole_id')
            .select('account.account_id', 'account.personnel_id', 'account.username', 'account.password', 'account.sysrole_id', 'system_role.sysrole_name')
            .where('username', loginInfo.username)
            .first()

        if (!user)
            return null;

        return user;
    }
}