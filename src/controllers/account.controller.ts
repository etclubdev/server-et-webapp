import { Request, Response } from 'express';

import accountService from '../services/account.service';

export default {
    deleteAccount: async (req: Request, res: Response) => {
        const { id } = req.params;

        try {
            const deletedAccount = await accountService.deleteAccount(id);

            if (!deletedAccount) {
                res.status(404).json({
                    msg: "Account not found"
                })
                return;
            }
            res.status(201).json({
                msg: "Successfully",
                data: deletedAccount
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
};