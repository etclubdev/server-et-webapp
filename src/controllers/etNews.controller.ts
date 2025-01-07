import { Request, Response, NextFunction } from 'express';
import ETNewsService from '../services/etNews.service';

const etNewsService = new ETNewsService();

export const createETNews = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { title, category, shortdescription, content, thumbnailimageurl, createddate, updateddate, source, visible, viewcount } = req.body;

        const newPost = await etNewsService.addETNews({
            title,
            category,
            shortdescription,
            content,
            thumbnailimageurl,
            createddate,
            updateddate,
            source,
            visible,
            viewcount: viewcount || 0,
        });

        res.status(200).json({
            message: 'ET News post created successfully',
            data: newPost,
        });
    } catch (error) {
        next(error); // Chuyển lỗi tới middleware xử lý lỗi
    }
};
