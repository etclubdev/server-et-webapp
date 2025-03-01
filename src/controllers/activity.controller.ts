import { Request, Response } from "express";
import DeleteActivityService from "../services/activity.service";

const deleteActivityService = new DeleteActivityService();

const deleteActivity = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const deleted = await deleteActivityService.deleteActivityById(id)

        if (!deleted) {
            res.status(404).json({ message: "Activity post not found" });
            return;
        }

        res.status(200).json({ message: "Activity post deleted successfully" });
    } catch (error) {
        res.status(500).json({
            message: "An internal server error occurred",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};

export default deleteActivity;