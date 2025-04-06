import db from '../utils/db.util';
import { Personnel } from '../types/personnel';

export default {
    updatePersonnel: async (
        id: string,
        personnelData: Partial<Personnel>,
        statusData: Partial<{
            term_id: string;
            department_name: string;
            position_name: string;
            personnel_status: string;
        }>
    ): Promise<{ personnel: Personnel | null; status: any | null }> => {
        const trx = await db.transaction();

        try {
            const updatedPersonnel = await trx('personnel')
                .where('personnel_id', id)
                .update(personnelData)
                .returning('*');

            if (updatedPersonnel.length === 0) {
                await trx.rollback();
                return { personnel: null, status: null };
            }
            const updatedStatus = await trx('personnel_status')
                .where('personnel_id', id)
                .update(statusData)
                .returning('*');

            if (updatedStatus.length === 0) {
                await trx.rollback();
                return { personnel: updatedPersonnel[0], status: null };
            }
            await trx.commit();

            return { personnel: updatedPersonnel[0], status: updatedStatus[0] };
        } catch (error) {
            await trx.rollback();
            throw error;
        }
    },
};