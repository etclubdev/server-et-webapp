import db from '../utils/db.util';
import { ETBlog } from '../types/etBlog';

export default {
    deleteEtBlog: async (id: string) => {
        return db('et_blog')
            .where('blog_id', id)
            .del()
    },
    deleteEtBlogs: async (etBlogs: string[]) => {
        if (!etBlogs || !Array.isArray(etBlogs) || etBlogs.length === 0) {
            throw new Error("Invalid Data");
        }

        return db.transaction(async (trx) => {
            let affectedRows = 0;
            for (const etBlogId of etBlogs) {
                const deletedEtBlogs = await trx("et_blog")
                    .where('blog_id', etBlogId)
                    .del();
                affectedRows += deletedEtBlogs;
            }

            return affectedRows;
        });
    },
    updateEtBlog: async (id: string, entity: ETBlog) => {
        const updatedBlog = await db('et_blog')
            .where('blog_id', id)
            .update(entity)
            .returning('*');
        if (updatedBlog.length === 0)
            return null;
        return updatedBlog;
    },
    createEtBlog: async (entity: ETBlog) => {
        return db('et_blog')
            .insert(entity)
            .returning("*");
    },
    getEtBlogById: async (id: string) => {
        const blog = await db('et_blog')
            .select("*")
            .where('blog_id', id)
        if (blog.length === 0) {
            return null;
        }
        return blog[0];
    },
    getAllEtBlogs: async () => {
        const blogs = await db('et_blog')
            .select("*")
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
            all: blogs
        };
    }
}