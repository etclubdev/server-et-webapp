import db from "../utils/db.util";
import { Personnel } from "../types/personnel";

export default {
    getPersonnelByID: async (id: string): Promise<any | null> => {
        const personnel = await db('personnel')
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
            )
            .where('personnel.personnel_id', id)
            .first();

        if (!personnel) {
            return null;
        }
        return personnel;
    },
    createPersonnelWithStatus: async (
        personnel: Personnel,
        status: {
            term_id: string;
            department_name: string;
            position_name: string;
            personnel_status: string;
        }
    ) => {
        return await db.transaction(async (trx) => {
            // 1. Insert personnel
            const [newPersonnel] = await trx("personnel")
                .insert(personnel)
                .returning("*");

            // 2. Insert personnel_status
            const [newStatus] = await trx("personnel_status")
                .insert({
                    personnel_id: newPersonnel.personnel_id,
                    term_id: status.term_id,
                    department_name: status.department_name,
                    position_name: status.position_name,
                    personnel_status: status.personnel_status
                })
                .returning("*");

            return {
                personnel: newPersonnel,
                status: newStatus
            };
        });
    },
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
};

