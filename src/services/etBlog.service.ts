import db from '../utils/db.util';

export default {
    createEtBlog: async (entity) => {
        return db('et_blog')
                .insert(entity);
    }
}