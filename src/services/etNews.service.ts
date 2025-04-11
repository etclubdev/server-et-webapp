import db from '../utils/db.util';
import { ETNews } from '../types/etNews';

export default {
    deleteETNews: async ( id: string ) => {
        return db('et_news')
            .where('etnews_id', id)
            .del()
    },

    updateETNews: async (id: string, news: ETNews) => {
        const updatedNews = await db("et_news")
            .where('etnews_id', id)
            .update(news)
            .returning('*');

        if (updatedNews.length === 0) return null;
        return updatedNews;
    },

    createNews: async(news: ETNews) => {
        return db('et_news')
        .insert(news)
        .returning('*');
    },

    getETNewsbyID: async(id: string) => {
        const news = await db("et_news").select("*")
            .where('etnews_id', id)

        if (news.length === 0) return null;
        return news[0];
    },

    getAllNews: async () => {
        try {
            // Get all news
            const news = await db("et_news").select("*");

            // Group news by category
            const groupedNews = news.reduce((acc, item) => {
                const category = item.etnews_category || "Uncategorized";
                if (!acc[category]) {
                    acc[category] = [];
                }
                acc[category].push(item);
                return acc;
            }, {} as Record<string, ETNews[]>);

            // Get latest 4 news
            const latestNews = [...news]
                .sort((a, b) => new Date(b.created_on).getTime() - new Date(a.created_on).getTime())
                .slice(0, 4);

            return { groupedNews, latestNews };
        } catch (error) {
            console.log(error);
            throw new Error('Error getting etnews: ' + error.message);
        }
    }
}

