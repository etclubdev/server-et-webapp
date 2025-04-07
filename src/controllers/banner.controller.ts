import { Request, Response } from 'express';

import bannerService from '../services/banner.service';

export default {
    getAllBanners: async (req: Request, res: Response): Promise<void> => {
        try {
            const banners = await bannerService.getAllBanners();

            if(!banners) {
                res.status(404).json({ message: 'No banners found' });
                return;
            }

            res.status(200).json({
                msg: 'Successfully',
                data: banners,
            });
            return;
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
            return;
        }
    },
}