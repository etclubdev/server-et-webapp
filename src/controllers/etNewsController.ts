import { Request, Response } from 'express';

import { EtNews} from '../entities/etNewsModel';



export const createEtNews = async (req: Request, res: Response): Promise<void> => {
    const { title, content, author, publishDate: providedPublishDate } = req.body;
    

    if (!title || title.length > 100) {
        res.status(400).json({ message: 'Title is required and must be less than 100 characters.' });
        return;
    }
    if (!content) {
        res.status(400).json({ message: 'Content is required.' });
        return;
    }
    if (typeof author !== 'string' || author.length === 0) {
        res.status(400).json({ message: 'Author is required and must be a valid string.' });
        return;
    }
    const isValidDate = (dateString: string): boolean => {
        const date = new Date(dateString);
        return !isNaN(date.getTime()) && date.toISOString() === dateString;
    };
    if (!providedPublishDate || !isValidDate(providedPublishDate)) {
        res.status(400).json({ message: 'PublishDate is required and must be a valid iso 8601 date.' });
        return;
    }

    try {
        const newNewsItem = await EtNews.create({ title, content, author, publishDate: providedPublishDate });
        res.status(201).json({
            message: 'ET News item created successfully',
            data: newNewsItem,
        });
    } catch (error) {
        console.error('Error creating news:', error); 
        res.status(500).json({ message: 'An error occurred while creating the ET News item.', error });
    }
};