import db from '../utils/db.util';
import { Personnel } from '../types/personnel';

export default {
    getAllPersonnel: async () => {
        const personnel = await db('personnel')
            .select('*');

        if (personnel.length === 0) {
            return null;
        }
        return personnel;
    },

};