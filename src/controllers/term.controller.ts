import { Request, Response } from 'express';

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
    }
}