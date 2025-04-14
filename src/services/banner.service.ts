import db from '../utils/db.util';
import { Banner } from '../types/banner';

export default {
    createBanner: async (banner: Banner) => {
        return db('banner')
            .insert(banner)
            .returning('*');
    },
    getAllBanners: async () => {
        const banners = await db('banner')
            .select('*')

        if (banners.length === 0) {
            return null;
        }
        return banners;
    },
    getBannerById: async (id: string) => {
        return await db('banner')
            .select('*')
            .where('banner_id', id)
            .first();
    },
    updateBanner: async (id: string, banner: Banner) => {
        return await db('banner')
            .where('banner_id', id)
            .update(banner)
            .returning("*");
    },
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