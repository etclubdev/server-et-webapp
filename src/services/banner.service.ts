import db from '../utils/db.util';
import { Banner } from '../types/banner';

export default {
    createBanner: async (banner: Banner) => {
        const { banner_name, image_url, visible } = banner;
        const result = await db.raw(
            `
            INSERT INTO banner (banner_name, image_url, visible)
            VALUES (?, ?, ?)
            RETURNING *
            `,
            [banner_name, image_url, visible]
        );
        return result.rows;
    },
    getAllBanners: async () => {
        const result = await db.raw(
            `
            SELECT * FROM banner
            `
        );
        if (!result.rows || result.rows.length === 0) {
            return null;
        }
        return result.rows;
    },
    getBannerById: async (id: string) => {
        const result = await db.raw(
            `
            SELECT * FROM banner WHERE banner_id = ?
            `,
            [id]
        );
        if (!result.rows || result.rows.length === 0) return null;
        return result.rows[0];
    },
    updateBanner: async (id: string, banner: Banner) => {
        const { banner_name, image_url, visible } = banner;
        const result = await db.raw(
            `
            UPDATE banner
            SET banner_name = ?, image_url = ?, visible = ?
            WHERE banner_id = ?
            RETURNING *
            `,
            [banner_name, image_url, visible, id]
        );
        return result.rows;
    },
    deleteBanner: async (id: string) => {
        const result = await db.raw(
            `
            DELETE FROM banner
            WHERE banner_id = ?
            RETURNING *
            `,
            [id]
        );
        if (!result.rows || result.rows.length === 0) return null;
        return result.rows;
    },
    deleteBanners: async (banners: string[]) => {
        if (!banners || !Array.isArray(banners) || banners.length === 0) {
            throw new Error("Invalid Data");
        }
        return db.transaction(async (trx) => {
            const result = await trx.raw(
                `
                DELETE FROM banner
                WHERE banner_id = ANY(?)
                RETURNING *
                `,
                [banners]
            );
            return result.rows;
        });
    },
}