import { Request, Response } from "express";

import etBlogService from "../services/etBlog.service";
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
    },
    createEtBlog: async (req: Request, res: Response) => {
        const blog = req.body;

        try {
            const createdBlog = await EtBlogService.createEtBlog(blog);

            res.status(200).json({
                msg: "The blog is created successfully",
                data: createdBlog
            })
            return;

        } catch (error) {
            console.log(error);
            res.status(500).json({
                msg: 'Internal Server Error'
            })
            return;
        }
    },
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