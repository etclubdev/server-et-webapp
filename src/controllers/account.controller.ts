import { Request, Response } from 'express';

import accountService from '../services/account.service';

export default {
    getAccountById: async (req: Request, res: Response) => {
        const { id } = req.params;

        try {
            const account = await accountService.getAccountById(id);
            console.log(account);

            if (!account) {
                res.status(404).json({
                    msg: "Not found"
                })
                return;
            }

            res.status(200).json({
                msg: "Successfully",
                data: account
            })
            return;
        } catch (error) {
            console.log(error);
            res.status(500).json({
                msg: "Internal Server Error" + error.message
            })
            return;
        }
    },
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
                msg: "Successfully",
                data: accounts
            })
            return;
        } catch (error) {
            console.log(error);
            res.status(500).json({
                msg: "Internal Server Error" + error.message
            })
            return;
        }
    },
    updateAccount: async (req: Request, res: Response) => {
        const { id } = req.params;
        const { sysrole_id } = req.body;

        try {
            const updatedAccount = await accountService.updateAccount(id, sysrole_id);

            if (!updatedAccount) {
                res.status(404).json({
                    msg: "Account not found or no changes applied"
                })
                return;
            }

            res.status(200).json({
                msg: "Successfully",
                data: updatedAccount
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