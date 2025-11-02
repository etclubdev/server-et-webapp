import db from '../utils/db.util';
import { Partner } from '../types/partner'

export default {
    getPartnerByCategory: async (category: string | string[] | undefined) => {
        
        let query = db("partner").select("*");

        if (Array.isArray(category)) {
            query = query.whereIn("partner_category_name", category);
        } else if (typeof category === "string") {
            query = query.where("partner_category_name", category);
        }

        const partners = await query;
        return partners.length > 0 ? partners : null
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
    getPartnerByID: async (id: string) => {
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

        const groupedPartners: Record<string, Partner[]> = {};

        partners.forEach((partner) => {
            const category = partner.partner_category_name || "Khác";
            if (!groupedPartners[category]) {
                groupedPartners[category] = [];
            }
            groupedPartners[category].push(partner);
        });

        return groupedPartners;
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

        return db.transaction(async (trx) => {
            for (const partner of partners) {
                await trx("partner")
                    .where('partner_id', partner.partner_id)
                    .update('visible', partner.visible)
            }
        });
    }
}
