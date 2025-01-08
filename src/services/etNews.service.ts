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
    // Lấy bài viết theo ID
    async getETNewsById(id: string): Promise<ETNews | null> {
        try {
            const [news] = await db<ETNews>('posts')
                .where({ postid: id })
                .select('*');
            return news || null;
        } catch (error) {
            throw new Error('Error retrieving ET News post by ID: ' + error.message);
        }
    }

    // Cập nhật bài viết
    async updateETNewsById(postid: string, updatedFields: Partial<ETNews>): Promise<ETNews | null> {
        try {
            // Kiểm tra xem bài viết có tồn tại hay không
            const [existingPost] = await db('posts').where({ postid }).select('*');

            if (!existingPost) {
                throw new Error(`ET News post with ID ${postid} does not exist`);
            }

            // Xử lý các trường được cập nhật
            if (!updatedFields || typeof updatedFields !== 'object') {
                throw new Error('Invalid update fields provided');
            }

            // Cập nhật bài viết
            const [updatedPost] = await db('posts')
                .where({ postid })
                .update(updatedFields)
                .returning('*');

            return updatedPost;
        } catch (error) {
            console.error('Error updating ET News post:', error.message);
            throw new Error(`Error updating ET News post: ${error.message}`);
        }
    }

}

export default ETNewsService;
