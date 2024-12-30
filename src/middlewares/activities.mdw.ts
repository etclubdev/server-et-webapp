import { Request, Response, NextFunction } from 'express';

const activitiesMdw = {
    validId: async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const idPattern = /^AC\d{3}$/;

        if (!idPattern.test(id)){
            res.status(400).json({
                message: 'Invalid Activity ID format. It should be in the format ACXXX, e.g., AC001'
            })
        }

        return next();
    }
}

export default activitiesMdw;