import { Request, Response } from "express";

import EtBlogService from '../services/etBlog.service';

export default {
    deleteEtBlog: async (req: Request, res: Response) => {
        const { id } = req.params;

        try {
            const deletedBlog = await EtBlogService.deleteEtBlog(id);

            if (deletedBlog === 0){
                res.status(404).json({
                    msg: "The blog is not found"
                })
                return;
            }

            res.status(200).json({
                msg: "The blog is deleted successfully",
                affected: deletedBlog
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