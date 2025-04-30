import { Request, Response } from 'express';

import searchService from '../services/search.service';

export default {
    searchAcrossTables: async (req: Request, res: Response) => {
        const { keyword } = req.body;

        if(!keyword) {
            res.status(400).json({
                message: "Keyword is required"
            })
            return;
        }

        try {
            const result = await searchService.searchAcrossTables(keyword);

            if(result.length === 0) {
                res.status(404).json({
                    message: "Not found"
                })
                return;
            }

            res.status(200).json({
                message: "Successfully",
                data: result
            })
            return;
        } catch (error) {
            res.status(500).json({
                message: "Internal Server Error " + error.message 
            })
            return;
        }
    }
}