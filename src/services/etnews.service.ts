import db from '../utils/db.util';
import { ETNews } from '../types/etnews';


export default {
    createNews: async(news: ETNews) => {
        return db('et_news')
        .insert(news)
        .returning('*');
    },
};