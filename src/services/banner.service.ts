import db from '../utils/db.util';
import { Banner } from '../types/banner'

export default {
    updateBanner: async (id: string, banner: Banner) => {
        return await db('banner')
            .where('banner_id', id)
            .update(banner)
            .returning("*");
    },
}