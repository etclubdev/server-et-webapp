import { table } from 'console';
import db from '../utils/db.util';

export default {
    searchAcrossTables: async (keyword: string) => {
        const activities = await db('activity')
            .select('activity_id', 'title', 'meta_description')
            .whereILike('title', `%${keyword}%`)

        const et_news = await db('et_news')
            .select('etnews_id', 'title', 'meta_description')
            .whereILike('title', `%${keyword}%`)

        const et_blog = await db('et_blog')
            .select('blog_id', 'title', 'meta_description')
            .whereILike('title', `%${keyword}%`)

        const [activitiesRows, etNewsRows, etBlogRows] = await Promise.all([
            activities,
            et_news,
            et_blog
        ])

        const result = [
            ...activitiesRows.map(r => ({ table: 'activity', ...r })),
            ...etNewsRows.map(r => ({ table: 'et_news', ...r })),
            ...etBlogRows.map(r => ({ table: 'et_blog', ...r }))
        ];

        return result;
    }
}