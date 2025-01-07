import db from '../database/migarations/db'




interface ETNews {
    id: number;
    title: string;
    category: string;
    shortDescription: string;
    content: string;
    source: string;
    visible: boolean;
    createdAt: Date;
}

//Query posts by ID
class ETNewsService {
    // Truy vấn bài viết theo ID
    async getETNewsById(id: number): Promise<ETNews | null> {
        try {
            const [news] = await db<ETNews>('et_news').where({ id }).select('*');
            return news || null;
        } catch (error) {
            throw new Error('Error retrieving ET News by ID: ' + error.message);
        }
    }
}
export default ETNewsService;