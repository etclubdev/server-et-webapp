import db from '../utils/db.util';

export default {
    deleteBanner: async (id: string) => {
        const deletedBanner = await db('banner')
        .where('banner_id', id)
        .del()
        .returning('*');

        if (deletedBanner.length === 0) {
            return null;
        }

        return deletedBanner;
    },

    deleteBanners: async (banners: string[]) => {
        if (!banners || !Array.isArray(banners) || banners.length === 0) {
            throw new Error("Invalid Data");
        }

        return db.transaction(async (trx) => {
            let affectedRows = 0;
            for (const bannerId of banners) {
                const deletedBanner = await trx("banner")
                    .where('banner_id', bannerId)
                    .del();
                affectedRows += deletedBanner;
            }

            return affectedRows;
        });
    },
}