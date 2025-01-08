import { Request, Response } from 'express';
import ETNewsService from '../services/etNews.service';

const etNewsService = new ETNewsService();

export const updateETNewsById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const updateData = req.body;

    try {
        // Validate ID
        if (!id) {
            res.status(400).json({
                status: 400,
                message: 'Invalid or missing "id" parameter.',
            });
            return;
        }

        // Kiểm tra xem bài viết có tồn tại không
        const existingPost = await etNewsService.getETNewsById(id);
        if (!existingPost) {
            res.status(404).json({
                status: 404,
                message: 'ET News post not found.',
            });
            return;
        }

        // Cập nhật bài viết
        const updatedPost = await etNewsService.updateETNewsById(id, updateData);

        res.status(200).json({
            status: 200,
            message: 'ET News post updated successfully.',
            data: updatedPost,
        });
    } catch (error) {
        console.error('Error updating ET News post:', error);
        res.status(500).json({
            status: 500,
            message: 'Internal Server Error',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};
