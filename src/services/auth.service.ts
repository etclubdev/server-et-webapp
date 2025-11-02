import db from '../utils/db.util';
import { LoginInfo } from '../types/auth';

export default {
    login: async (loginInfo: LoginInfo) => {
        const user = await db('account')
            .join('system_role', 'account.sysrole_id', 'system_role.sysrole_id')
            .join('personnel_status', 'account.personnel_id', 'personnel_status.personnel_id')
            .select('account.account_id', 'account.personnel_id', 'account.username', 'account.password', 'account.sysrole_id', 'system_role.sysrole_name', 'personnel_status.department_name')
            .where('username', loginInfo.username)
            .first()

        if (!user)
            return null;

        return user;
    }
}