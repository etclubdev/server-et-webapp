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
    updateVisible: async (partners: { partner_id: string; visible: boolean }[]) => {
        if (!partners || !Array.isArray(partners) || partners.length === 0) {
            throw new Error("Invalid Data");
        }
        console.log(partners);
        
        return db.transaction(async (trx) => {
            for (const partner of partners) {
                await trx("partner")
                    .where('partner_id', partner.partner_id)
                    .update('visible', partner.visible)
            }
        });
    }
}
