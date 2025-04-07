import db from '../utils/db.util';
import { ETNews } from '../types/etNews';

export default {
    deleteETNews: async ( id: string ) => {
        return db('et_news')
            .where('etnews_id', id)
            .del()
    },

    deleteMultipleEtNews: async (etNews: string[]) => {
        if (!etNews || !Array.isArray(etNews) || etNews.length === 0) {
            throw new Error("Invalid Data");
        }
                
        return db.transaction(async (trx) => {
            let affectedRows = 0;
            for (const etNewsId of etNews) {
                const deletedEtNews = await trx("et_news")
                    .where('etnews_id', etNewsId)
                    .del();
                affectedRows += deletedEtNews;
            }

            return affectedRows;
        });
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
        const news = await db("et_news").select("title", "thumbnail_image_url", "source", "content", "created_on", "visible")
            .where('etnews_id', id)

        if (news.length === 0) return null;
        return news[0];
    },

    getAllNews: async () => {
        try {
            // Get all news
            const news = await db("et_news").select("etnews_id", "title", "etnews_category", "thumbnail_image_url", "created_on");

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

