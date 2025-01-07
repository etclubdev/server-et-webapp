import { Request, Response, NextFunction } from 'express';
import ETNewsService from '../services/etNews.service';

const etNewsService = new ETNewsService();
export const getETNewsDetails = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            res.status(400).json({ status: 400, message: 'Invalid ID format' });
            return;
        }

        const news = await etNewsService.getETNewsById(id);

        if (!news) {
            res.status(404).json({ status: 404, message: 'ET News post not found' });
            return;
        }

        res.status(200).json({ status: 200, message: 'Success', data: news });
    } catch (error) {
        next(error);
    }
};
