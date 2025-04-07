import { Request, Response } from 'express';

import bannerService from '../services/banner.service';

export default {
    updateBanner: async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        const banner = req.body;

        try {
            const updatedBanner = await bannerService.updateBanner(id, banner);
            if (!updatedBanner) {
                res.status(404).json({ msg: 'Banner not found' });
                return;
            }
            res.status(200).json({ msg: 'Banner updated successfully', data: updatedBanner });
            return;
        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: 'Internal server error', error });
            return;
        }
    },
}