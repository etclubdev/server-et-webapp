import db from '../utils/db.util';
import { Partner } from '../types/partner'

export default {
    updatePartner: async (id: string, partner: Partner) => {
        const updatedPartner = await db('partner')
            .where('partner_id', id)
            .update(partner)
            .returning("*");

        if (updatedPartner.length === 0)
            return null;
        return updatedPartner;
    },
};