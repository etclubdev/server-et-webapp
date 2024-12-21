import knex from '../utils/database';
import { NewsData } from '../entities/INewsData';

export const EtNews = { // Tạo hàm EtNews
    create: async (newsData: NewsData): Promise<NewsData & { id: number }> => { // Tạo hàm create với tham số truyền vào là NewsData
        const [id] = await knex('et_news').insert(newsData).returning('id'); // Thêm dữ liệu vào bảng et_news và trả về id
        return Object.assign({ id }, newsData);
    },
};