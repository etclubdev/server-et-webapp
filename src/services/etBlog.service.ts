import db from '../utils/db.util';

export default {
    updateEtBlog: async (id, entity) => {
        return db('et_blog')
                .where('blog_id', id)
                .update(entity);
    }
}