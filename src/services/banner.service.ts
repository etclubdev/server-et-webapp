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
}