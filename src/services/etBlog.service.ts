import db from '../utils/db.util';

export default {
    deleteEtBlog: async( id ) => {
        return db('et_blog')
            .where('blog_id', id)
            .del()
    }
}