import db from '../utils/db.util';

export default {
    deleteMultiplePersonnels: async (personnelIds: string[]): Promise<number> => {
        if (!personnelIds || !Array.isArray(personnelIds) || personnelIds.length === 0) {
            throw new Error("Invalid Data: personnelIds must be a non-empty array");
        }

        return db.transaction(async (trx) => {
            let affectedRows = 0;

            for (const personnelId of personnelIds) {

                await trx('personnel_status')
                    .where('personnel_id', personnelId)
                    .del();


                const deletedPersonnel = await trx('personnel')
                    .where('personnel_id', personnelId)
                    .del();

                affectedRows += deletedPersonnel;
            }

            return affectedRows;
        });
    },
};