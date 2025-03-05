import db from '../utils/db.util';

export default {
    deletePartner: async (id: string) => {
        return db('partner')
            .where('partner_id', id)
            .del();
    },
};