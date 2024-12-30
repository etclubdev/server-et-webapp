import { Request, Response } from 'express';

import activitiesService from '../services/activities.service';

const activitiesController = {
    deleteActivity: async (req: Request, res: Response) => {
        const { id } = req.params;

        try {
            const deleteActivity = await activitiesService.deleteActivity(id);

            if (deleteActivity === 0){
                res.status(400).json({
                    message: `No activity found with ID ${id}`
                })
            } else {
                res.status(200).json({
                    message: `Successfully deleted the activity ID ${id}`
                })
            }
            
        } catch (error) {
            if (!res.headersSent){
                res.status(500).json({
                    message: 'An error occur when deleting the activity',
                    error: error.message
                })
            }
        }

    }
}

export default activitiesController;