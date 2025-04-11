import { Request, Response } from "express";

import EtBlogService from '../services/etBlog.service';

export default {
    deleteEtBlog: async (req: Request, res: Response) => {
        const { id } = req.params;

        try {
            const deletedBlog = await EtBlogService.deleteEtBlog(id);

            if (deletedBlog === 0){
                res.status(404).json({
                    message: "The blog is not found"
                })
                return;
            }

            res.status(204).json();
            return;

        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Internal Server Error'
            })
            return;
        }
    },
    updateEtBlog: async (req: Request, res: Response) => {
        const { id } = req.params;
        const blog = req.body;

        try {
            const updatedBlog = await EtBlogService.updateEtBlog(id, blog);

            if (!updatedBlog) {
                res.status(404).json({ 
                    message: "Blog not found or no changes applied" 
                });
                return;
            }

            res.status(200).json({
                message: "The blog is updated successfully",
                affected: updatedBlog
            })
            return;

        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Internal Server Error'
            })
            return;
        }
    },
    createEtBlog: async (req: Request, res: Response) => {
        const blog = req.body;

        try {
            const createdBlog = await EtBlogService.createEtBlog(blog);

            res.status(201).json({
                message: "The blog is created successfully",
                data: createdBlog
            })
            return;

        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Internal Server Error'
            })
            return;
        }
    },
    getEtBlogById: async (req: Request, res: Response) : Promise<void> => {
        try {
            const { id } = req.params;

            const blog = await EtBlogService.getEtBlogById(id);

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
            const blogs = await EtBlogService.getAllEtBlogs();

            if (!blogs) {
                res.status(404).json({ 
                    message: "No blogs found", 
                    data: {
                        highlighted: [], 
                        all: [] 
                    }
                })
                return;
            }

            res.status(200).json({ 
                success: true, 
                message: "Blogs retrieved successfully",
                data: blogs
            });
            return;

        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Internal Server Error" });
            return;
        }
    }

}