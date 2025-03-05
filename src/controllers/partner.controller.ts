import { Request, Response } from 'express';

import partnerService from '../services/partner.service';

export default {
    getAllPartner: async (req: Request, res: Response) => {
        try {
            const partners = await partnerService.getAllPartner();
            
            if (!partners) {
                res.status(404).json({
                    msg: "Partners not found"
                })
                return;
            }
            
            res.status(200).json({
                msg: "Successfully",
                data: partners
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