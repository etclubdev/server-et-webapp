import db from '../utils/db.util';
import { ETNews } from '../types/etNews';

export default {
    async updateETNews(id: string, news: ETNews) {
        const updatedNews = await db("et_news")
            .where('etnews_id', id)
            .update(news)
            .returning('*');

        if (updatedNews.length === 0) return null;
        return updatedNews;
    }
}
