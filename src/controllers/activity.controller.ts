import { Request, Response } from "express";
import DeleteActivityService from "../services/activity.service";

const deleteActivity = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const deletedActivity = await DeleteActivityService.deleteActivityById(id);

        if (deletedActivity === 0) {
            res.status(404).json({
                msg: "The activity post is not found"
            });
            return;
        }

        res.status(200).json({
            msg: "The activity post is deleted successfully",
            affected: deletedActivity
        });
        return;
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: "Internal Server Error"
        });
        return;
    }
};

export default deleteActivity;
