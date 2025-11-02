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
                message: 'Successfully',
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
                message: 'Successfully',
                data: banner,
            });
            return;
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Internal server error' + error });
            return;
        }
    },
    updateBanner: async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        const banner = req.body;

        try {
            const updatedBanner = await bannerService.updateBanner(id, banner);
            if (!updatedBanner) {
                res.status(404).json({ message: 'Banner not found' });
                return;
            }
            res.status(200).json({ message: 'Banner updated successfully', data: updatedBanner });
            return;
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Internal server error', error });
            return;
        }
    },
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