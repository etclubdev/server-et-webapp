import db from '../utils/db.util';

export default {
    getPartnerByCategory: async (category: string) => {
        const partners = await db('partner')
            .join('partner_category', 'partner_category.partner_category_id', 'partner.partner_category_id')
            .select('partner.*')
            .where('partner_category.partner_category_name', category);
        return partners;
    },
};