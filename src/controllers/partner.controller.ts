import { Request, Response } from 'express';

import partnerService from '../services/partner.service';

export default {
    deletePartner: async (req: Request, res: Response) => {
        const { id } = req.params;

        try {
            const deletedPartner = await partnerService.deletePartner(id);

            if (!deletedPartner) {
                res.status(404).json({
                    message: "Partner not found"
                })
                return;
            }
            res.status(201).json({
                message: "Successfully",
                data: deletedPartner
            })
            return;
        } catch (err) {
            console.log(err);
            res.status(500).json({
                message: 'Internal Server Error' + err.message
            })
            return;
        }
    },
    updatePartner: async (req: Request, res: Response) => {
        const { id } = req.params;
        const partner = req.body;

        try {
            const updatedPartner = await partnerService.updatePartner(id, partner);

            if (!updatedPartner) {
                res.status(404).json({
                    message: "Partner not found or no changes applied"
                })
                return;
            }

            res.status(201).json({
                message: "Successfully",
                data: updatedPartner
            })
            return;
        } catch (err) {
            console.log(err);
            res.status(500).json({
                message: 'Internal Server Error' + err.message
            })
            return;
        }
    },
    getPartnerByID: async (req: Request, res: Response) => {
        const { id } = req.params;

        try {
            const partner = await partnerService.getPartnerByID(id);

            if (!partner) {
                res.status(404).json({
                    message: 'Partner not found'
                });
                return;
            }
            res.status(200).json({
                message: "Successfully",
                data: partner
            })
            return;
        } catch (err) {
            console.log(err);
            res.status(500).json({
                message: 'Internal Server Error' + err.message
            })
            return;
        }
    },
    getPartner: async (req: Request, res: Response) => {
        try {

            const categoryId = req.query.categoryId as string;
            const partners = categoryId ? await partnerService.getPartnerByCategory(categoryId) : await partnerService.getAllPartner();

            if (!partners) {
                res.status(404).json({
                    message: "Partners not found"
                })
                return;
            }

            res.status(200).json({
                message: "Successfully",
                data: partners
            })
            return;
        } catch (err) {
            console.log(err);
            res.status(500).json({
                message: 'Internal Server Error' + err.message
            })
            return;
        }

    },
    createPartner: async (req: Request, res: Response) => {
        const partner = req.body;

        try {
            const createdPartner = await partnerService.createPartner(partner);

            res.status(201).json({
                message: "Partner is created successfully",
                data: createdPartner
            })
            return;
        } catch (err) {
            console.log(err);
            res.status(500).json({
                message: 'Internal Server Error' + err.message
            })
            return;
        }
    },
}