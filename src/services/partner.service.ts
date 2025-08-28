import db from '../utils/db.util';
import { Partner } from '../types/partner'

export default {
    getPartnerByCategory: async (category: string) => {
        const result = await db.raw(
            `SELECT * FROM partner WHERE partner_category_name = ?`,
            [category])
        const partners = result.rows;

        if (!partners || partners.length === 0) {
            return null;
        }
        return partners;
    },
    deletePartner: async (id: string) => {
        return db.raw(
            `DELETE FROM partner WHERE partner_id = ? RETURNING partner_id`,
            [id])
    },

    deletePartners: async (partners: string[]) => {
        if (!partners || !Array.isArray(partners) || partners.length === 0) {
            throw new Error("Invalid Data");
        }

        return db.transaction(async (trx) => {
            const result = await trx.raw(
                `DELETE FROM partner
             WHERE partner_id = ANY(:partners::uuid[])
             RETURNING *`,
                { partners } // named binding với Knex
            );

            return result.rows.length;
        });
    },

    updatePartner: async (id: string, partner: Partner) => {
        const updatedPartner = await db('partner')
            .update(partner)
            .where({ partner_id: id })
            .returning('*');

        if (updatedPartner.length === 0) {
            return null;
        }

        return updatedPartner[0];
    },
    getPartnerByID: async (id: string) => {
        const result = await db.raw(
            `SELECT * FROM partner WHERE partner_id = ?`,
            [id]
        );

        if (result.rows.length === 0) {
            return null;
        }
        return result.rows[0];
    },
    getAllPartner: async () => {
        const result = await db.raw(`SELECT * FROM partner`);
        const partners = result.rows;

        if (!partners || partners.length === 0) {
            return null;
        }

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
        const result = await db.raw(
            `INSERT INTO partner (
                partner_name, partner_category_name, avatar_url, 
                short_description, email, phone_number, visible
            ) VALUES (?, ?, ?, ?, ?, ?, ?)
            RETURNING *`,
            [
                partner.partner_name,
                partner.partner_category_name,
                partner.avatar_url,
                partner.short_description,
                partner.email,
                partner.phone_number,
                partner.visible
            ]
        );
        return result.rows[0];
    },

    updateVisible: async (partners: { partner_id: string; visible: boolean }[]) => {
        if (!partners || !Array.isArray(partners) || partners.length === 0) {
            throw new Error("Invalid Data");
        }

        return db.transaction(async (trx) => {
            for (const partner of partners) {
                await trx.raw(
                    `UPDATE partner 
                 SET visible = $1 
                 WHERE partner_id = $2`,
                    [partner.visible, partner.partner_id]
                );
            }
            return true;
        });
    }
}
