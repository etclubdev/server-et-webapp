import bcrypt from 'bcrypt';

import db from '../utils/db.util';

export default {
    updatePassword: async (account_id: string, oldPassword: string, newPassword: string) => {
        const user = await db('account').where('account_id', account_id).first();

        if (user.length === 0) {
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
