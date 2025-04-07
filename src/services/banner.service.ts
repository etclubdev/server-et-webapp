import db from '../utils/db.util';
import { Banner } from '../types/banner';

export default {
    createBanner: async (banner: Banner) => {
        return db('banner')
            .insert(banner)
            .returning('*');
    },
}