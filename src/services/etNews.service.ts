import db from '../utils/db.util';
import { ETNews } from '../types/etNews';

export default {
    deleteETNews: async (id: string) => {
        const result = await db.raw(
            `DELETE FROM et_news WHERE etnews_id = ? RETURNING etnews_id`,
            [id]
        );
        return result.rows.length;
    },

    deleteMultipleEtNews: async (etNews: string[]) => {
        if (!etNews || !Array.isArray(etNews) || etNews.length === 0) {
            throw new Error("Invalid Data");
        }

        const result = await db.raw(
            `DELETE FROM et_news
             WHERE etnews_id = ANY(:etNews::uuid[])
             RETURNING etnews_id`,
            { etNews }
        );

        return result.rows.length;
    },

    updateETNews: async (id: string, news: ETNews) => {
        const updatedNews = await db("et_news")
            .where('etnews_id', id)
            .update(news)
            .returning('*');

        if (updatedNews.length === 0) return null;
        return updatedNews;
    },

    createNews: async (news: ETNews) => {
        const result = await db.raw(
            `INSERT INTO et_news (title, etnews_category, meta_description, thumbnail_image_url, source, visible, content, view_count)
            VALUES (:title, :etnews_category, :meta_description, :thumbnail_image_url, :source, :visible, :content, :view_count)
            RETURNING *`,
            {
                title: news.title,
                etnews_category: news.etnews_category,
                meta_description: news.meta_description,
                thumbnail_image_url: news.thumbnail_image_url,
                source: news.source,
                visible: news.visible,
                content: news.content,
                view_count: news.view_count || 0
            }
        );
        return result.rows[0];
    },

    getETNewsbyID: async (id: string) => {
        const result = await db.raw(
            `SELECT * FROM et_news WHERE etnews_id = ?`,
            [id]
        );
        const news = result.rows;
        if (news.length === 0) return null;
        return news[0];
    },

    getAllNews: async () => {
        try {
            // Get all news
            const result = await db.raw(`SELECT * FROM et_news`);
            const news = result.rows;

            if (!news || news.length === 0) {
                return null;
            }

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

