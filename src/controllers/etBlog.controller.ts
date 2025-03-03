import { Request, Response } from "express";

import etBlogService from "../services/etBlog.service";

export default {
    getEtBlogById: async (req: Request, res: Response) : Promise<void> => {
        try {
            const { id } = req.params;

            const blog = await etBlogService.getEtBlogById(id);

            if (blog === null) {
                res.status(404).json({ error: "The blog does not exist" });
                return;
            }

            res.status(200).json({ success: true, data: blog });
            return;

        } catch (error) {
            console.log(error);         
            res.status(500).json({ error: "Internal Server Error" });
            return;
        }
    },
    getAllEtBlogs: async (req: Request, res: Response) : Promise<void> => {
        try {
            const blogs = await etBlogService.getAllEtBlogs();

            if (!blogs) {
                res.status(404).json({ 
                    msg: "No blogs found", 
                    highlighted: [], 
                    alldata: [] 
                })
            }

            res.status(200).json({ 
                success: true, 
                msg: "Blogs retrieved successfully",
                ...blogs
            });
            return;

        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Internal Server Error" });
            return;
        }
    }

}