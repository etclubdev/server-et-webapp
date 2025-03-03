import { Request, Response } from "express";
import etBlogService from "../services/etBlog.service";

export default {
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
            res.status(500).json({ error: "Internal Server Error" });
            return;
        }
    }
}