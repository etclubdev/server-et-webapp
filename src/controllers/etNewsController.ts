import { Request, Response } from 'express';
import dotenv from 'dotenv';

import { EtNews} from '../services/etNewServices';
import isValidDate  from '../utils/checkValiday';

dotenv.config(); //Use environment variables for .env file

export const createEtNews = async (req: Request, res: Response): Promise<void> => {
    const { title, content, author, publishDate} = req.body;
    

    if (!title || title.length > process.env.MAX_CHARACTER) {
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
    
    if (!publishDate || !isValidDate(publishDate)) {
        res.status(400).json({ message: 'PublishDate is required and must be a valid iso 8601 date.' });
        return;
    }

    try {
        const newNewsItem = await EtNews.create({ title, content, author, publishDate});
        res.status(201).json({
            message: 'ET News item created successfully',
            data: newNewsItem,
        });
    } catch (error) {
        if (error.code === 'ETIMEOUT') {
            res.status(500).json({ message: 'Database connection timeout. Please try again later.' });
        } else {
            res.status(500).json({ message: 'An unexpected error occurred.', error });
        }
        console.error('Error creating news:', error);
    }
};