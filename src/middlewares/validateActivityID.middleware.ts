import { Request, Response, NextFunction } from 'express';

const validateActivityID = (req: Request, res: Response, next: NextFunction) => {
    const { activityid } = req.params;

    if (!activityid) {
        res.status(400).json({ message: "Activity ID is required." });
        return;
    }

    const regex = /^AC\d{3}$/;
    if (!regex.test(activityid)) {
        res.status(400).json({ message: "Activity ID must follow the format ACXXX, where X is a digit."});
    };

    next();
};

export default validateActivityID;
