import db from '../utils/db.util';

interface ETNews {
    postid?: number;
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
    async addETNews(news: ETNews): Promise<ETNews> {
        try {
            const [newPost] = await db<ETNews>('posts')
                .insert(news)
                .returning('*');
            return newPost;
        } catch (error) {
            throw new Error('Error creating ET News: ' + error.message);
        }
    }
}

export default ETNewsService;