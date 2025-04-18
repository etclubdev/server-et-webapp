import { Request, Response, NextFunction } from 'express';
const jwt = require('jsonwebtoken');

interface JWTPayload {
    account_id: string;
    username: string;
    sysrole_name: string;
    personnel_id: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: JWTPayload;
        }
    }
}

const authGuard = {
    verifyToken: (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization;
        if (token) {
            const accessToken = token.split(' ')[1];
            jwt.verify(accessToken, process.env.JWT_SECRET, (err: any, decoded: JWTPayload) => {
                if (err) {
                    if (err.name === 'TokenExpiredError') {
                        console.log("Token has expired:", err);
                        return res.status(401).json("Token has expired!");
                    }
                    console.log("Token verification error:", err);
                    return res.status(403).json("Token is not valid!");
                }
                req.user = decoded;
                console.log("Decoded Token:", decoded);
                next();
            });
        } else {
            return res.status(401).json("You are not authenticated!");
        }
    },

    verifyRoles: (requiredRoles: string[]) => {
        return (req: Request, res: Response, next: NextFunction) => {
            authGuard.verifyToken(req, res, () => {
                const userRole = req.user?.sysrole_name;

                if (!userRole || !requiredRoles.includes(userRole)) {
                    return res.status(403).json("You do not have permission to access this resource!");
                }
                next();
            });
        };
    }
};

export default authGuard;