import { Request, Response } from 'express';

import accountService from '../services/account.service';

export default {
    getAllAccount: async (req: Request, res: Response) => {
        try {
            const accounts = await accountService.getAllAccount();

            if (!accounts) {
                res.status(404).json({
                    msg: "No accounts found"
                })
                return;
            }

            res.status(200).json({
                success: true,
                msg: "Successfully",
                ...accounts
            });
            return;
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Internal Server Error" });
            return;
        }
    }
}