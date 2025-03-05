import db from '../utils/db.util';

export default {
    getPartnerByID: async(id: string) => {
        const partner = await db('partner')
                .select('*')
                .where('partner_id', id);
        
        if (partner.length === 0) {
            return null;
        }

        return partner[0];
    },
};