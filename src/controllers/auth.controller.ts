import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'


import authService from '../services/auth.service';

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET || '124';

export default {

    login: async (req: Request, res: Response) => {
        try {
            const info = req.body;
            const user = await authService.login(info);

            if (!user) {
                res.status(404).json({
                    message: 'User not found',
                    success: false,
                });
                return;
            }

            const validPassword = await bcrypt.compare(info.password, user.password);

            if (!validPassword) {
                res.status(401).json({
                    message: 'Wrong password',
                    success: false
                });
                return;
            }

            const payload = {
                account_id: user.account_id,
                personnel_id: user.personnel_id,
                username: user.username,
                sysrole_id: user.sysrole_id,
                sysrole_name: user.sysrole_name,
            };

            const accessToken = jwt.sign(payload, SECRET_KEY, { expiresIn: '2m' });
            const refreshToken = jwt.sign(
                {
                    ...payload,
                    token_type: 'refresh'
                },
                SECRET_KEY,
                { expiresIn: '7d' }
            );

            res.status(200).json({
                message: 'Successfully logged in',
                accessToken,
                refreshToken,
                success: true,
            });
            return;
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Internal Server Error: ' + error.message,
            });
            return;
        }
    },

    renewToken: async (req: Request, res: Response) => {
        const refreshToken = req.headers['authorization'];

        if (!refreshToken) {
            res.status(401).json({
                message: 'Refresh token is missing',
                success: false,
            });
            return;
        }

        const token = refreshToken.split(' ')[1];

        try {

            const decoded = jwt.verify(token, SECRET_KEY) as jwt.JwtPayload;

            if (decoded.token_type != 'refresh') {
                res.status(403).json({
                    message: 'Invalid token type. Refresh token required.',
                    success: false,
                })
                return;
            }

            const newAccessToken = jwt.sign(
                {
                    account_id: decoded.account_id,
                    personnel_id: decoded.personnel_id,
                    username: decoded.username,
                    sysrole_id: decoded.sysrole_id,
                    sysrole_name: decoded.sysrole_name
                },
                SECRET_KEY,
                { expiresIn: '2m' }
            );

            const newRefreshToken = jwt.sign(
                {
                    account_id: decoded.account_id,
                    personnel_id: decoded.personnel_id,
                    username: decoded.username,
                    sysrole_id: decoded.sysrole_id,
                    sysrole_name: decoded.sysrole_name,
                    token_type: 'refresh'
                },
                SECRET_KEY,
                { expiresIn: '7d' }
            )

            res.status(200).json({
                message: 'Token refreshed successfully',
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
                success: true
            });
            return;
        } catch (error) {
            res.status(401).json({
                message: 'Invalid or expired refresh token: ' + error.message,
                success: false,
            });
            return;
        }
    },
};
