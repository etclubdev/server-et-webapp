import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import accountService from '../services/account.service';

export default {
    updateAccount: async (req: Request, res: Response) => {
            const { id } = req.params;
            const account = req.body;
            
            try {
                if(account.password) {
                    const salt = await bcrypt.genSalt(10);
                    account.password = await bcrypt.hash(account.password, salt)
                }

                const updatedAccount = await accountService.updateAccount(id, account);
                
                if (!updatedAccount) {
                    res.status(404).json({
                        msg: "Account not found or no changes applied"
                    })
                    return;
                }
    
                res.status(201).json({
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