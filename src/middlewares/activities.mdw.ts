import express, { Request, Response, NextFunction } from 'express';
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

interface activitiesRequest extends Request {
    id: string,
    updateData: object
  }

const activitiesMdw = {
    validInput: async (req: activitiesRequest, res: Response, next: NextFunction): Promise<void> => {
        const { id } = req.params;
        const { activityName, activityType, description, status, thumbnailImage, startDate, endDate, visible, sponsoredBudget, actualExpenses } = req.body;
        
        const idPattern = /^AC\d{3}$/;

        const updateData: { [key: string]: any } = {};
        if (activityName) updateData.activityname = activityName;
        if (activityType) updateData.activitytype = activityType;
        if (description) updateData.desc = description;
        if (status) updateData.status = status;
        if (thumbnailImage) updateData.thumbnailImage = thumbnailImage;
        if (startDate) updateData.startDate = startDate;
        if (endDate) updateData.endDate = endDate;
        if (visible) updateData.visible = visible;
        if (sponsoredBudget) updateData.sponsoredBudget = sponsoredBudget;
        if (actualExpenses) updateData.actualExpenses = actualExpenses;

        if (!idPattern.test(id)){
            res.status(400).json({
                message: 'Invalid Activity ID format. It should be in the format ACXXX, e.g., AC001.'
            })
        }

        if (Object.keys(updateData).length === 0){
            res.status(400).json({
                message: 'No valid fields to update'
            })
        }

        req.id = id;
        req.updateData = updateData;
        
        return next();
    }
}

export default activitiesMdw;