import knex from '../utils/database';
import { NewsData } from '../entities/etNews.entity';

/**
 * A module for managing news-related database operations.
 */
const EtNews = { 
    /**
     * Creates a new news entry in the database.
     * @async
     * @function
     * @param {NewsData} newsData - The data for the news entry to be created.
     * @returns {Promise<NewsData & { id: number }>} A promise that resolves to the created news entry with the assigned id.
     */
    create: async (newsData: NewsData): Promise<NewsData & { id: number }> => {
        const [id] = await knex('et_news').insert(newsData).returning('id'); 
        return Object.assign({ id }, newsData); 
    },
};

export default EtNews;
