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
    deleteAccount: async (req: Request, res: Response) => {
        const { id } = req.params;

        try {
            const deletedAccount = await accountService.deleteAccount(id);

            if (!deletedAccount) {
                res.status(404).json({
                    msg: "Not found"
                })
                return;
            }
            res.status(204).json({
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
    deleteAccounts: async (req: Request, res: Response) => {
        const { accounts } = req.body;

        try {
            const deletedAccounts = await accountService.deleteAccounts(accounts);

            if (!deletedAccounts) {
                res.status(404).json({
                    msg: "Not found"
                })
                return;
            }
            res.status(204).json({
                msg: "Successfully",
                data: deletedAccounts
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
    updatePassword: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { oldPassword, newPassword } = req.body;

            const result = await accountService.updatePassword(id, oldPassword, newPassword);

            if (!result) {
                res.status(404).json({ message: "Not found" });
                return
            }

            if (result.success === false) {
                res.status(401).json({ success: false, message: result.message });
                return;
            }

            res.status(200).json({ success: true, message: result.message });
            return;
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal server error" + error.message });
            return;
        }
    },
}