import db from '../utils/db.util';

export default {
    async getETNewsbyID(id: string) {
            const news = await db("et_news").select("title", "thumbnail_image_url", "source", "content", "created_on", "visible")
                .where('etnews_id', id)

            if (news.length === 0) return null;
            return news[0];
    }
}
