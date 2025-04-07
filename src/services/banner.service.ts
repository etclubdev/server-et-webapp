import db from '../utils/db.util';

export default {
    getBannerById: async (id: string) => {
        return await db('banner')
        .select('*')
        .where('banner_id', id)
        .first();
    },
}