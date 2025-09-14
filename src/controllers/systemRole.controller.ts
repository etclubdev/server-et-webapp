import { Request, Response } from "express";

import systemRoleService from "../services/systemRole.service";

export default {
    getAllSystemRole: async (req: Request, res: Response) => {
        try {
            const systemRole = await systemRoleService.getAllSystemRole();

            if (!systemRole) {
                res.status(404).json({
                    message: "Not found",
                });
                return;
            }

            res.status(200).json({
                message: "Successfully",
                data: systemRole,
            });
            return;
        } catch (err) {
            console.log(err);
            res.status(500).json({
                message: "Internal Server Error" + err.message,
            });
            return;
        }
    }

}