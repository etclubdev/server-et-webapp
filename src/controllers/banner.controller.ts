import { Request, Response } from 'express';

import bannerService from '../services/banner.service';

export default {
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
