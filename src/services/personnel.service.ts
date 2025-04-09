import db from '../utils/db.util';
import { Personnel } from '../types/personnel';

export default {


    getPersonnelByID: async (id: string): Promise<Personnel | null> => {
        const personnel = await db('personnel')
            .select('*')
            .where('personnel_id', id)
            .first();

        if (!personnel) {
            return null;
        }
        return personnel;
    },
};