import { Request, Response } from "express";

import accountService from "../services/account.service";

export default {
    updatePassword: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { oldPassword, newPassword, confirmPassword } = req.body;

            if(confirmPassword !== newPassword) {
                res.status(400).json({ success: false, message: "Confirm password does not match" });
                return;
            }

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
