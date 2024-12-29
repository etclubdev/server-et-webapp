import activitiesService from "../services/activities.service";
import { Request, Response } from 'express';

interface activitiesRequest extends Request {
    id: string,
    updateData: object
  }
  
const activitiesController = {
    updateActivity: async ( req: activitiesRequest, res: Response ) => {
        const id = req.id;
        const updateData = req.updateData;

        try {  
            const updateActivity = await activitiesService.updateActivity({ id, updateData });  
            res.status(201).json({  
                message: 'The activity updated successfully',  
                data: updateActivity  
            });  
        } catch (error) {  
            if (!res.headersSent) { // Check if headers have been sent  
                res.status(500).json({   
                    message: 'An error occurred while updating the activity.',   
                    error: error.message   
                });  
            }  
        } 
    }
}

export default activitiesController;
