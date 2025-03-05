import db from '../utils/db.util';
import { ETNews } from '../types/etNews';

export default {
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

