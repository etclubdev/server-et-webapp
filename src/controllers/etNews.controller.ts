import { Request, Response } from 'express';
import ETNewsService from '../services/etNews.service';

const etNewsService = new ETNewsService();

// Lấy bài viết theo ID
export const getETNewsById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        if (!id) {
            res.status(400).json({
                status: 400,
                message: 'Missing "id" parameter.',
            });
            return;
        }

        const news = await etNewsService.getETNewsById(id);

        if (!news) {
            res.status(404).json({
                status: 404,
                message: 'ET News post not found.',
            });
            return;
        }

        res.status(200).json({
            status: 200,
            message: 'Successfully retrieved ET News post.',
            data: news,
        });
    } catch (error) {
        console.error('Error retrieving ET News post:', error);
        res.status(500).json({
            status: 500,
            message: 'Internal Server Error',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};
