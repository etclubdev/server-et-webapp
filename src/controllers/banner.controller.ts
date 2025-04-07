import { Request, Response } from 'express';

import bannerService from '../services/banner.service';

export default {
    deleteBanner: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const deletedBanner = await bannerService.deleteBanner(id);
            if (!deletedBanner) {
                res.status(404).json({ message: 'Not found' });
                return;
            }
            res.status(204).json();
            return;
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Internal server error' + error.message });
            return;
        }
    },
    deleteBanners: async (req: Request, res: Response) => {
        try {
            const { banners } = req.body;
            const deletedBanners = await bannerService.deleteBanners(banners);

            if (!deletedBanners) {
                res.status(404).json({ message: 'Not found' });
                return;
            }
            res.status(204).json();
            return;
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Internal server error' + error.message });
            return;
        }
    },

}