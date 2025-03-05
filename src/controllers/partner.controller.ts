import { Request, Response } from 'express';

import partnerService from '../services/partner.service';

export default {
    getPartnerByID: async (req: Request, res: Response) => {
        const { id } = req.params;

        try {
            const partner = await partnerService.getPartnerByID(id);

            if(!partner) {
                res.status(404).json({
                    msg: 'Partner not found'
                });
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