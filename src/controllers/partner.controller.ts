import { Request, Response } from 'express';

import partnerService from '../services/partner.service';

export default {
    updatePartner: async (req: Request, res: Response) => {
        const { id } = req.params;
        const partner = req.body;

        try {
            const updatedPartner = await partnerService.updatePartner(id, partner);

            if (!updatedPartner) {
                res.status(404).json({
                    msg: "Partner not found or no changes applied"
                })
                return;
            }

            res.status(201).json({
                msg: "Successfully",
                data: updatedPartner
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