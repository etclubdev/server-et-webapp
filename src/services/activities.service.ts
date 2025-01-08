import db from '../utils/db.util'
import { Activity } from '../entities/activity.entity';

class createActivityService {
    async createActivity (activity: Activity) {
        const { ActivityName, ActivityType, Description, Status, ThumbnailImageURL, StartDate, EndDate, Visible, SponsoredBudget, ActualExpenses, Scale }= activity
        
        try{    
            const [newActivity] = await db('activities')
                .insert({ 
                        activityname: ActivityName,
                        activitytype: ActivityType,
                        description: Description,
                        status: Status,
                        thumbnailimageurl: ThumbnailImageURL,
                        startdate: StartDate,
                        enddate: EndDate,
                        visible: Visible,
                        sponsoredbudget: SponsoredBudget,
                        actualexpenses: ActualExpenses,
                        scale: Scale
                    })
                .returning('*');

            return newActivity;
        } catch (error) {
            throw new Error('Error creating activity: ' + error.message);
        }
    }
}

export default createActivityService;