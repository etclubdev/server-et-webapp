import db from '../utils/db.util';
import { Activity} from '../entities/activity.entity';

class selectActivityService {
    async selectbyID(activityid: string): Promise<Activity | null> {
        try {
            let query = db('activities').select('*').where('activityid', activityid);
            const activity = await query.first();
            return activity || null;
        } catch (err) {
            throw new Error('Error getting activity by ID: ' + err.message);
        }
    }
}

export default new selectActivityService();