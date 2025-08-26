import { Request, Response } from 'express';
import apicache from 'apicache';

import termService from '../services/term.service';

export default {
    getAllTerms: async (req: Request, res: Response) => {
        try {
            const terms = await termService.getAllTerms();

            if(!terms) {
                res.status(404).json({
                    message: 'No term found'
                })
                return;
            }

            res.status(200).json({
                message: 'Successfully',
                data: terms
            })
            return;
        } catch (error) {
            res.status(500).json({
                message: 'Internal Server Error' + error. message
            })
            return;
        }
    },
    createTerm: async (req: Request, res: Response) => {
        try {
            const term = req.body;

            if (!term || !term.term_name) {
                res.status(400).json({
                    message: 'Invalid term data'
                });
                return;
            }

            const newTerm = await termService.createTerm(term);
            apicache.clear('/terms');
            res.status(201).json({
                message: 'Term created successfully',
                data: newTerm
            });
        } catch (error) {
            res.status(500).json({
                message: 'Internal Server Error' + error.message
            });
        }
    }
}