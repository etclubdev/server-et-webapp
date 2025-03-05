import db from '../utils/db.util';

export default {
    getAllPartner: async() => {
        const partners = await db('partner')
                .select('*');

        if (partners.length === 0) {
            return null;
        }
        return partners;
    },
};