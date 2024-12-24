import { Request, Response } from 'express';
import dotenv from 'dotenv';

import EtNews from '../services/etNewServices';
import isValidDate from '../utils/checkValiday';

/**
 * Load environment variables from the .env file.
 */
dotenv.config(); 

/**
 * Controller to handle the creation of a new ET News item.
 * @async
 * @function createEtNews
 * @param {Request} req - Express request object, containing the body with `title`, `content`, `author`, and `publishDate`.
 * @param {Response} res - Express response object, used to send a response back to the client.
 * @returns {Promise<void>} A promise that resolves when the response is sent.
 */
const createEtNews = async (req: Request, res: Response): Promise<void> => {
    const { title, content, author, publishdate } = req.body;

    if (!title || title.length > process.env.MAX_ET_NEWS_TITLE_LENGTH) {
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
    if (!publishdate || !isValidDate(publishdate)) {
        res.status(400).json({ message: 'PublishDate is required and must be a valid timestamp.' });
        return;
    }
    try {
        const newNewsItem = await EtNews.create({ title, content, author, publishdate });
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

export default { createEtNews };
