import db from '../utils/db.util';

export default {
    getEtBlogById: async( id ) => {
        const blog = await db('et_blog')
                .select('blog_id', 'title', 'blog_author', 'visible', 'content', 'created_on')
                .where('blog_id', id)
        if (blog.length === 0){
            return null;
        }
        return blog[0];
    }
}