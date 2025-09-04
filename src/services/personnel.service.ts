import db from '../utils/db.util';
import { Personnel } from '../types/personnel';

export default {
    getUnregisteredPersonnels: async () => {
        const result = await db.raw(
            `SELECT p.*, ps.*
        FROM personnel p
        JOIN personnel_status ps ON p.personnel_id = ps.personnel_id
        LEFT JOIN account a ON p.personnel_id = a.personnel_id
        WHERE a.personnel_id IS NULL;
    `);
        const personnels = result.rows;
        return personnels;
    },

    getPersonnelByDepartment: async (departmentName: string): Promise<Personnel[]> => {
        if (!departmentName || departmentName.trim() === "") {
            throw new Error("Invalid Data: departmentName is required");
        }

        const result = await db.raw(
            `
        SELECT p.*, ps.*
        FROM personnel p
        JOIN personnel_status ps ON p.personnel_id = ps.personnel_id
        WHERE ps.department_name = ?
        `,
            [departmentName]
        );

        return result.rows || [];
    },

    deleteMultiplePersonnels: async (personnelIds: string[]): Promise<number> => {
        if (!personnelIds || !Array.isArray(personnelIds) || personnelIds.length === 0) {
            throw new Error("Invalid Data: personnelIds must be a non-empty array");
        }

        return db.transaction(async (trx) => {
            let affectedRows = 0;

            for (const personnelId of personnelIds) {
                await trx.raw(`DELETE FROM account WHERE personnel_id = ?`, [personnelId]);
                await trx.raw(`DELETE FROM personnel_status WHERE personnel_id = ?`, [personnelId]);

                const deletedPersonnel = await trx.raw(
                    `DELETE FROM personnel WHERE personnel_id = ? RETURNING *`,
                    [personnelId]
                );

                const rows = deletedPersonnel.rows || [];
                affectedRows += rows.length;
            }

            return affectedRows;
        });
    },

    deletePersonnel: async (id: string): Promise<boolean> => {
        const trx = await db.transaction();

        try {
            await trx.raw(`DELETE FROM account WHERE personnel_id = ?`, [id]);
            await trx.raw(`DELETE FROM personnel_status WHERE personnel_id = ?`, [id]);

            const deletedPersonnel = await trx.raw(
                `DELETE FROM personnel WHERE personnel_id = ? RETURNING *`,
                [id]
            );

            const rows = deletedPersonnel.rows || deletedPersonnel[0];
            if (!rows || rows.length === 0) {
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
    ): Promise<{ personnel: Personnel | null; status: string | null }> => {
        const trx = await db.transaction();

        try {
            let updatedPersonnel: Personnel | null = null;
            let updatedStatus: string | null = null;

            // Pre-check unique email nếu có cập nhật email
            if (personnelData.email) {
                const checkEmail = await trx.raw(
                    `SELECT personnel_id FROM personnel WHERE email = ? AND personnel_id <> ?`,
                    [personnelData.email, id]
                );
                if (checkEmail.rows && checkEmail.rows.length > 0) {
                    await trx.rollback();
                    throw new Error('Email already exists');
                }
            }

            // Update personnel nếu có data
            if (Object.keys(personnelData).length > 0) {
                const result = await trx('personnel')
                    .where({ personnel_id: id })
                    .update(personnelData)
                    .returning('*');
                updatedPersonnel = result[0] || null;
            }

            if (Object.keys(statusData).length > 0) {
                const result = await trx('personnel_status')
                    .where({ personnel_id: id })
                    .update(statusData)
                    .returning('personnel_status');
                updatedStatus = result[0]?.personnel_status || null;
            }

            await trx.commit();

            if (!updatedPersonnel && !updatedStatus) {
                return { personnel: null, status: null };
            }

            return { personnel: updatedPersonnel, status: updatedStatus };

        } catch (err) {
            await trx.rollback();
            throw err;
        }
    },

    getPersonnelByID: async (id: string): Promise<Personnel | null> => {
        const result = await db.raw(
            `SELECT * FROM personnel
            JOIN personnel_status ON personnel.personnel_id = personnel_status.personnel_id
            WHERE personnel.personnel_id = ?`,
            [id]
        );

        const personnel = result.rows[0];

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
            // Pre-check unique email
            const checkEmail = await trx.raw(
                `SELECT personnel_id FROM personnel WHERE email = ?`,
                [personnel.email]
            );
            if (checkEmail.rows && checkEmail.rows.length > 0) {
                throw new Error('Email already exists');
            }
            const insertPersonnel = await trx.raw(
                `INSERT INTO personnel (
                personnel_name, phone_number, email, dob, gender, address, 
                student_id, university, faculty, major, class, avatar_url, cv_type, cv_link, cohort_name
            ) VALUES (
                ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
            )
            RETURNING *`,
                [personnel.personnel_name, personnel.phone_number, personnel.email, personnel.dob, personnel.gender, personnel.address,
                personnel.student_id, personnel.university, personnel.faculty, personnel.major, personnel.class, personnel.avatar_url, personnel.cv_type, personnel.cv_link, personnel.cohort_name]
            );
            const newPersonnel = insertPersonnel.rows[0];

            const insertStatus = await trx.raw(
                `INSERT INTO personnel_status (
                personnel_id, term_id, department_name, position_name, personnel_status
            ) VALUES (
                ?, ?, ?, ?, ?
            )
            RETURNING *`,
                [newPersonnel.personnel_id,
                status.term_id,
                status.department_name,
                status.position_name,
                status.personnel_status
                ]
            );
            const newStatus = insertStatus.rows[0];

            return {
                personnel: newPersonnel,
                status: newStatus
            };
        });
    },
    getAllPersonnel: async () => {
        const result = await db.raw(
            `SELECT * FROM personnel
            JOIN personnel_status ON personnel.personnel_id = personnel_status.personnel_id`);

        const personnels = result.rows;

        if (personnels.length === 0) {
            return null;
        }
        return personnels;
    },
    getPersonnelByStatus: async (status: string): Promise<Personnel[]> => {
        if (!status) {
            throw new Error("Invalid Data: status is required");
        }

        const result = await db.raw(
            `SELECT * FROM personnel
            JOIN personnel_status ON personnel.personnel_id = personnel_status.personnel_id
            WHERE personnel_status.personnel_status = ?`,
            [status]
        )
        const personnels = result.rows;

        return personnels;
    },
    getPersonnelByDepartmentAndStatus: async (
        departmentName: string,
        status: string
    ): Promise<Personnel[]> => {
        if (!departmentName || !status) {
            throw new Error("Invalid Data: departmentName and status are required");
        }

        const result = await db.raw(
            `SELECT * FROM personnel
            JOIN personnel_status ON personnel.personnel_id = personnel_status.personnel_id
            WHERE personnel_status.department_name = ? AND personnel_status.personnel_status = ?`,
            [departmentName, status]
        )

        const personnels = result.rows;

        return personnels;
    }
};