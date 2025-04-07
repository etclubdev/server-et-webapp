import db from '../utils/db.util';

export default {
    getAllBanners: async () => {
        const banners = await db('banner')
        .select('*')

        if(banners.length === 0) {
            return null;
        }
        return banners;
    },
}