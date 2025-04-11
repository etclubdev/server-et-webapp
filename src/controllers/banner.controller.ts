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
    getAllBanners: async (req: Request, res: Response): Promise<void> => {
        try {
            const banners = await bannerService.getAllBanners();

            if (!banners) {
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
    getBannerById: async (req: Request, res: Response) => {
        try {
            const banner = await bannerService.getBannerById(req.params.id);
            if (!banner) {
                res.status(404).json({ message: 'Not found' });
                return;
            }

            res.status(200).json({
                msg: 'Successfully',
                data: banner,
            });
            return;
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Internal server error' + error });
            return;
        }
    },
}