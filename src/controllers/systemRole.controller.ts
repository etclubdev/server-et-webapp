import { Request, Response } from "express";

import systemRoleService from "../services/systemRole.service";

export default {
    getSystemRoleIdByName: async (req: Request, res: Response) => {
        const { sysrole_name } = req.body;

        try {
            const systemRole = await systemRoleService.getSystemRoleIdByName(sysrole_name);

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