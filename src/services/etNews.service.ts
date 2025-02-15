import db from '../utils/db.util';

class deletePostService {
    async deletePostbyID(postid: string): Promise<number> {
        try {
            const result = await db('posts').where('postid', postid).del();
            return result;
        } catch (err) {
            throw new Error(`Error deleting post: ${err}.`);
        }
    }
}
export default new deletePostService();