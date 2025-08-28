import db from '../utils/db.util';
import { ETBlog } from '../types/etBlog';

export default {
    deleteEtBlog: async (id: string) => {
        const result = await db.raw(
            `
            DELETE FROM et_blog
            WHERE blog_id = ?
            `,
            [id]
        );
        return result.rowCount;
    },
    deleteEtBlogs: async (etBlogs: string[]) => {
        if (!etBlogs || !Array.isArray(etBlogs) || etBlogs.length === 0) {
            throw new Error("Invalid Data");
        }
        return db.transaction(async (trx) => {
            const result = await trx.raw(
                `
                DELETE FROM et_blog
                WHERE blog_id = ANY(?)
                `,
                [etBlogs]
            );
            return result.rowCount;
        });
    },
    updateEtBlog: async (id: string, entity: ETBlog) => {
        const {
            title,
            thumbnail_image_url,
            blog_author,
            meta_description,
            visible,
            content,
        } = entity;
        const result = await db.raw(
            `
            UPDATE et_blog
            SET title = ?, thumbnail_image_url = ?, blog_author = ?, meta_description = ?, visible = ?, content = ? 
            WHERE blog_id = ?
            RETURNING *
            `,
            [
                title,
                thumbnail_image_url,
                blog_author,
                meta_description,
                visible,
                content,
                id
            ]
        );
        if (!result.rows || result.rows.length === 0) return null;
        return result.rows;
    },
    createEtBlog: async (entity: ETBlog) => {
        const {
            title,
            thumbnail_image_url,
            blog_author,
            meta_description,
            visible,
            content,
        } = entity;
        const result = await db.raw(
            `
            INSERT INTO et_blog (
                title, thumbnail_image_url, blog_author, meta_description, visible, content
            ) VALUES (?, ?, ?, ?, ?, ?)
            RETURNING *
            `,
            [
                title,
                thumbnail_image_url,
                blog_author,
                meta_description,
                visible,
                content
            ]
        );
        return result.rows;
    },
    getEtBlogById: async (id: string) => {
        const result = await db.raw(
            `
            SELECT * FROM et_blog WHERE blog_id = ?
            `,
            [id]
        );
        if (!result.rows || result.rows.length === 0) return null;
        return result.rows[0];
    },
    getAllEtBlogs: async () => {
        const result = await db.raw(
            `
            SELECT * FROM et_blog ORDER BY created_on DESC
            `
        );
        if (!result.rows || result.rows.length === 0) {
            return null;
        }
        // Get top 4 blogs with the highest views
        const highlighted = [...result.rows]
            .sort((a, b) => b.view_count - a.view_count)
            .slice(0, 4);
        return {
            highlighted,
            all: result.rows
        };
    }
}