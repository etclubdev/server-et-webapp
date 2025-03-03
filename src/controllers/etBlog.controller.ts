import { Request, Response } from "express";

import EtBlogService from '../services/etBlog.service';

export default {
    updateEtBlog: async (req: Request, res: Response) => {
        const { id } = req.params;
        const blog = req.body;

        try {
            const updatedBlog = await EtBlogService.updateEtBlog(id, blog);

            if (!updatedBlog) {
                res.status(404).json({ 
                    msg: "Blog not found or no changes applied" 
                });
                return;
            }

            res.status(200).json({
                msg: "The blog is updated successfully",
                affected: updatedBlog
            })
            return;

        } catch (error) {
            console.log(error);
            res.status(500).json({
                msg: 'Internal Server Error'
            })
            return;
        }
    }
}