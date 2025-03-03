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
    },
    createEtBlog: async (entity) => {
        return db('et_blog')
                .insert(entity)
                .returning("*");
    },
    getEtBlogById: async( id ) => {
        const blog = await db('et_blog')
                .select('blog_id', 'title', 'blog_author', 'visible', 'content', 'created_on')
                .where('blog_id', id)
        if (blog.length === 0){
            return null;
        }
        return blog[0];
    },
    getAllEtBlogs: async () => {
        const blogs = await db('et_blog')
            .select('blog_id', 'title', 'thumbnail_image_url', 'visible', 'meta_description', 'created_on')
            .orderBy('created_on', 'desc');

        if (blogs.length === 0) {
            return null;
        }
        
        // Get top 4 blogs with the highest views
        const highlighted = [...blogs]
            .sort((a, b) => b.view_count - a.view_count) 
            .slice(0, 4); 

        return {
            highlighted,
            alldata: blogs
        };
    }
}