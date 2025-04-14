import { Request, Response } from "express";

import systemRoleService from "../services/systemRole.service";

export default {
    getAllSystemRole: async (req: Request, res: Response) => {
        try {
            const systemRole = await systemRoleService.getAllSystemRole();

            if (!systemRole) {
                res.status(404).json({
                    msg: "Not found",
                });
                return;
            }

            res.status(200).json({
                msg: "Successfully",
                data: systemRole,
            });
            return;
        } catch (err) {
            console.log(err);
            res.status(500).json({
                msg: "Internal Server Error" + err.message,
            });
            return;
        }
    }

}