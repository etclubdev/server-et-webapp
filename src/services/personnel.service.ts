import db from '../utils/db.util';

export default {


    getPersonnelByStatus: async (status: string): Promise<any[]> => {
        if (!status) {
            throw new Error("Invalid Data: status is required");
        }


        const personnels = await db('personnel')
            .join('personnel_status', 'personnel.personnel_id', 'personnel_status.personnel_id')
            .select(
                'personnel.personnel_id',
                'personnel.student_id',
                'personnel_name',
                'personnel.email',
                'personnel_status.term_id',
                'personnel_status.department_name',
                'personnel_status.position_name',
                'personnel_status.personnel_status'
            )
            .where('personnel_status.personnel_status', status);

        return personnels;
    },
};