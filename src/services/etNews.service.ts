import db from '../utils/db.util';

interface ETNews {
    postid?: string;
    title: string;
    category: string;
    shortdescription: string;
    content: string;
    thumbnailimageurl?: string;
    createddate: Date,
    updateddate: Date,
    source: string;
    visible: string;
    viewcount?: number;
}


class ETNewsService {
    async getETNewsById(id: string): Promise<ETNews | null> {
        try {
            const [news] = await db<ETNews>('posts')
                .where({ postid: id })
                .select('*');

            return news || null;
        } catch (error) {
            throw new Error('Error retrieving ET News post: ' + error.message);
        }
    }
}

export default ETNewsService;
