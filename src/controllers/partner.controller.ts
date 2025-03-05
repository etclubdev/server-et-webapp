import { Request, Response } from 'express';

import partnerService from '../services/partner.service';

export default {
    getPartnerByCategory: async (req: Request, res: Response) => {
        const  category  = req.query.category as string;

        try {
            const partner = await partnerService.getPartnerByCategory(category);

            if(!partner) {
                res.status(404).json({
                    msg: 'Partner not Found'
                })
                return;
            }

            res.status(200).json({
                msg: "Successfully",
                data: partner
            })
            return;
        } catch (err) {
            console.log(err);
            res.status(500).json({
                msg: 'Internal Server Error' + err.message
            })  
            return;
        }
    },
}