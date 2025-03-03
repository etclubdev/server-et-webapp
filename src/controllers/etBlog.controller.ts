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
            res.status(500).json({ error: "Internal Server Error" });
            return;
        }
    }
}