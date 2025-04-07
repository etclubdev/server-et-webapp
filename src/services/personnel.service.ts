import db from '../utils/db.util';
import { Personnel } from '../types/personnel';

export default {
    getAllPersonnel: async () => {
        const personnels = await db('personnel')
            .join('personnel_status', 'personnel.personnel_id', 'personnel_status.personnel_id')
            .select(
                'personnel.personnel_id',
                'personnel.student_id',
                'personnel.personnel_name',
                'personnel.email',
                'personnel.dob',
                'personnel.gender',
                'personnel.address',
                'personnel.faculty',
                'personnel.university',
                'personnel.major',
                'personnel.class',
                'personnel.cv_type',
                'personnel.cv_link',
                'personnel.cohort_name',
                'personnel_status.term_id',
                'personnel_status.department_name',
                'personnel_status.position_name',
                'personnel_status.personnel_status'
            );

        if (personnels.length === 0) {
            return null;
        }
        return personnels;
    },
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