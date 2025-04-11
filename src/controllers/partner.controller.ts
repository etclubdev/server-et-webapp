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
            res.status(204).json();
            return;
        } catch (err) {
            console.log(err);
            res.status(500).json({
                message: 'Internal Server Error' + err.message
            })
            return;
        }
    },

    deletePartners: async (req: Request, res: Response) => {
        const { partners } = req.body;

        try {
            const deletedPartners = await partnerService.deletePartners(partners);

            if (!deletedPartners) {
                res.status(404).json({
                    msg: "Not found"
                })
                return;
            }
            res.status(204).json()
            return;

        }catch (err) {
            console.log(err);
            res.status(500).json({
                msg: 'Internal Server Error' + err.message
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
    updateVisible: async (req: Request, res: Response) => {
        try {
            const {partners} = req.body; 
            
            if (!partners || !Array.isArray(partners) || partners.length === 0) {
                res.status(400).json({
                    message: "Invalid Data"
                });
                return;
            }

            await partnerService.updateVisible(partners);

            res.status(200).json({
                msg: "Successfully",
                updatedCount: partners.length
            })
            return;
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Internal Server Error" + error.message
            });
            return;
        }
    },
}