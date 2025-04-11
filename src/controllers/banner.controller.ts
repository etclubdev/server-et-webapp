import { Request, Response } from 'express';

import bannerService from '../services/banner.service';

export default {
    createBanner: async (req: Request, res: Response): Promise<void> => {
        const banner = req.body;
        try {
            const createdBanner = await bannerService.createBanner(banner);
            res.status(201).json({
                message: 'Successfully',
                data: createdBanner,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Internal Server Error: ' + error.message,
            });
            return;
        }
    },
}