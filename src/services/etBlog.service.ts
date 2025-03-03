import db from '../utils/db.util';

export default {
    updateEtBlog: async (id, entity) => {
        const updatedBlog = await db('et_blog')
                                    .where('blog_id', id)
                                    .update(entity)
                                    .returning('*');
        if (updatedBlog.length === 0)
            return null;
        return updatedBlog;
    }
}