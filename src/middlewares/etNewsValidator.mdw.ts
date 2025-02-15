import { Request, Response, NextFunction } from 'express';

const validatePostID = (req: Request, res: Response, next: NextFunction) => {
    const { postid } = req.params;

    if (!postid) {
        res.status(400).json({ message: "Post ID is required." });
        return;
    }

    const regex = /^EN\d{3}$/;
    if (!regex.test(postid)) {
        res.status(400).json({ message: "Post ID must follow the format ENXXX, where X is a digit."});
    }

    next();
};

export default validatePostID;
