import { Request, Response } from 'express';

import deletePostService from '../services/etNews.service';

const deletePostbyID = async (req: Request, res: Response) => {
    try {
        const { postid } = req.params;

        const post = await deletePostService.deletePostbyID(postid);

        if (!post) {
            res.status(404).json({ message: "Post not found" });
            return;
        }

        res.status(200).json({
            message: `The post with ID: ${postid} has been deleted successfully`,
        });
        return;
    } catch (err) {
        res.status(500).json({
            message: 'An internal server error occurred',
            error: err instanceof Error ? err.message : "Unknown error",
        });
        return;
    }
}   

export default deletePostbyID;