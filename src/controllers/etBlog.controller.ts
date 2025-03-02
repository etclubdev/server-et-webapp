import { Request, Response } from "express";

import EtBlogService from '../services/etBlog.service';

export default {
    createEtBlog: async (req: Request, res: Response) => {
        const blog = req.body;

        try {
            const createdBlog = await EtBlogService.createEtBlog(blog);

            res.status(200).json({
                msg: "The blog is created successfully",
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