import { Request, Response } from 'express';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

import authService from '../services/auth.service';

const SECRET_KEY = process.env.JWT_SECRET || '124'

export default {
    login: async (req: Request, res: Response) => {
        try {
            const info = req.body
            const user = await authService.login(info)

            if (!user) {
                res.status(404).json({
                    message: 'User not found',
                    success: false
                })
                return;
            }

            const validPassword = await bcrypt.compare(info.password, user.password)

            if (!validPassword) {
                res.status(401).json({
                    message: 'Wrong password',
                })
                return;
            }

            const iat = Math.floor(Date.now() / 1000);
            const exp = iat + 60 * 60;

            const payload = {
                account_id: user.account_id,
                personnel_id: user.personnel_id,
                username: user.username,
                sysrole_name: user.sysrole_name,
                issued_at: iat,
                expiration_at: exp
            };

            const accessToken = jwt.sign(payload, SECRET_KEY);
            const refreshToken = jwt.sign({ account_id: user.account_id}, SECRET_KEY);

            if (user && validPassword) {
                res.status(200).json({
                    message: 'Successfully',
                    accessToken,
                    refreshToken, 
                    success: true
                })
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: 'Internal Server Error' + error.message
            })
            return;
        }
    }
}