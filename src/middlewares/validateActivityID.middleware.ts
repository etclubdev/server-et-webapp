import { Request, Response, NextFunction } from 'express';

const validateActivityID = (req: Request, res: Response, next: NextFunction) => {
    const { activityid } = req.params;

    if (!activityid) {
        res.status(400).json({ message: "Activity ID is required." });
        return;
    }

    next(); // Tiếp tục xử lý nếu `activityid` tồn tại
};

export default validateActivityID;
