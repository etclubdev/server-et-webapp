import db from '../utils/db.util';
import { LoginInfo } from '../types/auth';

export default {
    login: async (loginInfo: LoginInfo) => {
        const user = await db('account')
            .select('*')
            .where('username', loginInfo.username)
            .first()

        if (!user)
            return null;

        return user;
    }
}