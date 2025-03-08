import db from '../utils/db.util';
import { Partner } from '../types/partner'

export default {
    getPartnerByCategory: async (categoryId: string) => {
        const partners = await db('partner')
            .select('*')
            .where('partner_category_id', categoryId);
        
            if (partners.length === 0) {
                return null;
            }
            return partners;
    },
    getPartnerByID: async(id: string) => {
        const partner = await db('partner')
                .select('*')
                .where('partner_id', id);

        if (partner.length === 0) {
            return null;
        }
        return partner[0];
    },
    getAllPartner: async () => {
        const partners = await db('partner')
            .select('*');

        if (partners.length === 0) {
            return null;
        }
        return partners;
    },
    createPartner: async (partner: Partner) => {
        return db('partner')
            .insert(partner)
            .returning("*");
    },
}
