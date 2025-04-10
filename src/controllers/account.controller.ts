import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import accountService from '../services/account.service';

export default {
    updateAccount: async (req: Request, res: Response) => {
            const { id } = req.params;
            const account = req.body;
            
            try {
                const updatedAccount = await accountService.updateAccount(id, account);
                
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