import db from '../utils/db.util';

export default {
    getAllAccount: async () => {
        const accounts = await db('account')
            .select('sysrole_id')
            .groupBy('sysrole_id')
            .select(
                db.raw(`
                    JSON_AGG(
                        JSON_BUILD_OBJECT(
                            'account_id', account_id,
                            'username', username,
                            'password', password,
                            'created_on', created_on,
                            'last_modified_on', last_modified_on
                        )
                    ) AS accounts
                `)
            )
            .orderBy('sysrole_id');

        return accounts.length ? accounts : null;
    }
};
