import db from '../utils/db.util';

export default {

    getPersonnelByDepartment: async (departmentName: string): Promise<any[]> => {
        if (!departmentName) {
            throw new Error("Invalid Data: departmentName is required");
        }


        const personnels = await db('personnel')
            .join('personnel_status', 'personnel.personnel_id', 'personnel_status.personnel_id')
            .select(
                'personnel.personnel_id',
                'personnel.student_id',
                'personnel.personnel_name',
                'personnel.email',
                'personnel_status.term_id',
                'personnel_status.department_name',
                'personnel_status.position_name',
                'personnel_status.personnel_status'
            )
            .where('personnel_status.department_name', departmentName);

        return personnels;
    },
};