import db from '../utils/db.util';

export default {
    searchAcrossTables: async (keyword: string) => {
        const activities = await db.raw(
            `SELECT activity_id, title, meta_description, thumbnail_image_url
            FROM activity
            WHERE title ILIKE '%' || ? || '%'
            LIMIT 3`,
            [keyword]
        );

        const et_news = await db.raw(
            `SELECT etnews_id, title, meta_description, thumbnail_image_url
            FROM et_news
            WHERE title ILIKE '%' || ? || '%'
            LIMIT 3`,
            [keyword]
        );

        const et_blog = await db.raw(
            `SELECT blog_id, title, meta_description, thumbnail_image_url
            FROM et_blog
            WHERE title ILIKE '%' || ? || '%'
            LIMIT 3`,
            [keyword]
        );

        const [activitiesRows, etNewsRows, etBlogRows] = await Promise.all([
            activities.rows,
            et_news.rows,
            et_blog.rows
        ])

        const result = [
            ...activitiesRows.map(r => ({ table: 'activity', ...r })),
            ...etNewsRows.map(r => ({ table: 'et_news', ...r })),
            ...etBlogRows.map(r => ({ table: 'et_blog', ...r }))
        ];

        return result;
    }
}