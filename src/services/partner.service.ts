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
    deletePartner: async (id: string) => {
        return db('partner')
            .where('partner_id', id)
            .del();
    },

    deletePartners: async (partners: string[]) => {
        if (!partners || !Array.isArray(partners) || partners.length === 0) {
            throw new Error("Invalid Data");
        }

        return db.transaction(async (trx) => {
            let affectedRows = 0;
            for (const partnerId of partners) {
                const deletedPartner = await trx("partner")
                    .where('partner_id', partnerId)
                    .del();
                affectedRows += deletedPartner;
            }

            return affectedRows;
        });
    },

    updatePartner: async (id: string, partner: Partner) => {
        const updatedPartner = await db('partner')
            .where('partner_id', id)
            .update(partner)
            .returning("*");

        if (updatedPartner.length === 0)
            return null;
        return updatedPartner;
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
