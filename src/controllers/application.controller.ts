import { Response, Request } from 'express';

import applicationService from '../services/application.service';

export default {
    restoreApplication: async (req: Request, res: Response) => {
        const reviewed_by = req.user?.personnel_id;
        const { ids } = req.body;
        try {
            const restoredApplications = await applicationService.restoreApplication(reviewed_by, ids);
            
            if (!restoredApplications || restoredApplications.length === 0) {
                res.status(404).json({ message: 'No applications found to restore.' });
                return;
            }
            res.status(200).json({
                message: 'Applications restored successfully.',
                data: restoredApplications
            })
            return;
        } catch (error) {
            if (error.message === "Cannot restore application that has been approved in round 3") {
                res.status(409).json({ message: error.message });
                return;
            }
            res.status(500).json({ message: 'Internal Server Error ' + error.message });
            return;
        }
    }
}