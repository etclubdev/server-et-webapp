import db from '../utils/db.util';
import { Partner } from '../types/partner'

export default {
    createPartner: async(partner: Partner) => {
        return db('partner')
                .insert(partner)
                .returning("*");
    },
};