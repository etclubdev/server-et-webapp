import db from '../utils/db.util'

export default {
    deleteAccount: async (id: string) => {
        await db('profile')
        .where('account_id', id)
        .del();

        return db('account')
        .where('account_id', id)
        .del();
    },
};