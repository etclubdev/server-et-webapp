import db from '../utils/db.util';
import { Personnel } from '../types/personnel';

export default {
    getUnregisteredPersonnels: async () => {
        const personnels = await db('personnel')
            .join('personnel_status', 'personnel.personnel_id', 'personnel_status.personnel_id')
            .leftJoin('account', 'personnel.personnel_id', 'account.personnel_id')
            .whereNull('account.personnel_id')
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
        return personnels;
    },
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
            .where('personnel_status.department_name', departmentName);

        return personnels;
    },
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
    deletePersonnel: async (id: string): Promise<boolean> => {
        const trx = await db.transaction();

        try {

            const deletedAccount = await trx('account')
                .where('personnel_id', id)
                .del();

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
    getPersonnelByStatus: async (status: string): Promise<any[]> => {
        if (!status) {
            throw new Error("Invalid Data: status is required");
        }


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
            )
            .where('personnel_status.personnel_status', status);

        return personnels;
    },
};