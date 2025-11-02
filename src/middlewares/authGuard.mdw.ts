import { Request, Response, NextFunction } from 'express';
import jwt, { JsonWebTokenError, TokenExpiredError, NotBeforeError } from 'jsonwebtoken';

import { JWTPayload } from '../types/auth';
import departmentService from '../services/department.service';

import '../global/globalJWTPayload';


const isAdministrator = (req: Request): boolean => {
    return req.user?.sysrole_name === 'Administrator';
};
const isHR = (req: Request): boolean => {
    return req.user?.sysrole_name === 'Trưởng ban HR';
};

const checkUserRole = (req: Request, res: Response, requiredRoles: string[], next: NextFunction) => {
    const userRole = req.user?.sysrole_name;

    if (!userRole || !requiredRoles.includes(userRole)) {
        return res.status(403).json("You do not have permission to access this resource!");
    }

    next();
};

const authGuard = {
    verifyToken: (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization;
        if (token) {
            const accessToken = token.split(' ')[1];
            jwt.verify(accessToken, process.env.JWT_SECRET, (err: JsonWebTokenError | TokenExpiredError | NotBeforeError | null, decoded: JWTPayload) => {
                if (err) {
                    if (err.name === 'TokenExpiredError') {
                        console.log("Token has expired:", err);
                        return res.status(401).json("Token has expired!");
                    }
                    console.log("Token verification error:", err);
                    return res.status(403).json("Token is not valid!");
                }
                req.user = decoded;
                // console.log("Decoded Token:", decoded);
                next();
            });
        } else {
            return res.status(401).json("You are not authenticated!");
        }
    },

    verifyRoles: (requiredRoles: string[]) => {
        return (req: Request, res: Response, next: NextFunction) => {
            authGuard.verifyToken(req, res, () => {
                checkUserRole(req, res, requiredRoles, next);
            });
        };
    },
    verifyDepartment: () => {
        return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
            try {
                if (isAdministrator(req)) {
                    return next();
                }
                else if (isHR(req)) {
                    return next();
                }
                const userId1 = req.user?.personnel_id;
                const userId2 = req.body['id'] || req.query['id'] || req.params['id'];

                if (!userId1 || !userId2) {
                    res.status(400).json("Missing user IDs for department verification!");
                    return;
                }

                const isSameDepartment = await departmentService.checkDepartmentMatch(userId1, userId2);

                if (!isSameDepartment) {
                    res.status(403).json("You do not have permission to access this resource!");
                    return;
                }

                next();
            } catch (error) {
                console.error('Error checking department match:', error);
                res.status(500).json("Internal server error!");
            }
        };
    },
    verifyDepartmentForManageApplication: () => {
        return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
            try {
                if (isAdministrator(req)) {
                    return next();
                }
                const userId = req.user?.personnel_id;
                const applicationId = req.body.ids
                    ? req.body.ids
                    : req.query.ids
                        ? (req.query.ids as string).split(",")
                        : req.params.id
                            ? [req.params.id]
                            : [];
                
                if (!userId || applicationId.length === 0) {
                    res.status(400).json("Missing user IDs for department verification!");
                    return;
                }

                const { isMatched, message } = await departmentService.checkDepartmentMatchWithApplication(userId, applicationId);

                if (!isMatched) {
                    res.status(403).json(message);
                    return;
                }

                next();
            } catch (error) {
                console.error('Error checking department match:', error);
                res.status(500).json("Internal server error!");
            }
        };
    },
    verifyDepartmentForBulk: () => {
        return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
            try {
                if (isAdministrator(req)) {
                    return next();
                }
                const userId1 = req.user?.personnel_id;
                const personnelIds: string[] = req.body.personnelIds;

                if (!userId1 || !personnelIds || personnelIds.length === 0) {
                    res.status(400).json("Missing user IDs for department verification!");
                    return;
                }

                const userId2 = personnelIds[0];

                const isSameDepartment = await departmentService.checkDepartmentMatch(userId1, userId2);

                if (!isSameDepartment) {
                    res.status(403).json(`User ${userId2} does not belong to the same department!`);
                    return;
                }

                next();
            } catch (error) {
                console.error('Error checking department match:', error);
                res.status(500).json("Internal server error!");
                return;
            }
        };
    },
    verifyDepartmentForPost: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {

            if (isAdministrator(req)) {
                return next();
            }


            const userId = req.user?.personnel_id;
            const targetDepartment = req.body.status?.department_name;


            if (!userId) {
                res.status(400).json("Missing user ID in JWT!");
                return;
            }
            if (!targetDepartment) {
                res.status(400).json("Missing target department in request body!");
                return;
            }


            const isSameDepartment = await departmentService.checkUserDepartment(userId, targetDepartment);

            if (!isSameDepartment) {
                res.status(403).json("You do not have permission to create an object in this department!");
                return;
            }

            next();
        } catch (error) {
            console.error('Error verifying department for POST:', error);
            res.status(500).json("Internal server error!");
        }
    }
};



export default authGuard;