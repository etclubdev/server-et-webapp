import db from '../utils/db.util';

export default {
    deletePersonnel: async (id: string): Promise<boolean> => {
        const trx = await db.transaction();

        try {

            const deletedStatus = await trx('personnel_status')
                .where('personnel_id', id)
                .del();


            const deletedPersonnel = await trx('personnel')
                .where('personnel_id', id)
                .del();

            if (deletedPersonnel === 0) {
                await trx.rollback();
                return false;
            }
            await trx.commit();
            return true;
        } catch (error) {
            await trx.rollback();
            throw error;
        }
    },
};