import db from '../utils/db.util';
import { ETNews } from '../types/etNews';


export default {
    createNews: async(news: ETNews) => {
        return db('et_news')
        .insert(news)
        .returning('*');
    },
};