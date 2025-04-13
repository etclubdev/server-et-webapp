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
      let updatedPersonnel;
      let updatedStatus;

      if (personnelData) {
        updatedPersonnel = await trx('personnel')
          .where('personnel_id', id)
          .update(personnelData)
          .returning('*');

        if (updatedPersonnel.length === 0) {
          await trx.rollback();
          return { personnel: null, status: null };
        }
      }

      if (statusData) {
        updatedStatus = await trx('personnel_status')
          .where('personnel_id', id)
          .update(statusData)
          .returning('*');

        if (updatedStatus && updatedStatus.length === 0) {
          await trx.rollback();
          return { personnel: null, status: null };
        }
      }

      await trx.commit();

      console.log(updatedPersonnel, updatedStatus);

      return {
        personnel: updatedPersonnel?.[0] ?? null,
        status: updatedStatus?.[0] ?? null,
      };
    } catch (error) {
      await trx.rollback();
      throw error;
    }
  },
};
