import db from '../utils/db.util';

export default {
    approveApplication: async (reviewed_by: string, ids: string[]) => {
        const result = await db.raw(
            `SELECT * FROM application
            WHERE application_id = ANY(?::uuid[])`, [ids]
        );
        const applications = result.rows;
        if (applications.length !== ids.length) {
            throw new Error('Some applications not found');
        }

        for (const application of applications) {
            if (application.round < 3) {
                await db.raw(
                    `UPDATE application
                SET round = round + 1, reviewed_by = ?, reviewed_on = NOW()
                WHERE application_id = ?`, [reviewed_by, application.application_id]
                );
            }
            if (application.round === 3) {
                await db.raw(
                    `UPDATE application 
                SET application_status = 'Approved', reviewed_by = ?, reviewed_on = NOW()
                WHERE application_id = ?`, [reviewed_by, application.application_id]
                );

                await db.raw(
                    `INSERT INTO personnel (personnel_name, phone_number, email, dob, gender, student_id, university, faculty, major, class, cv_type, cv_link)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
                    application.full_name,
                    application.phone_number,
                    application.email,
                    application.dob,
                    application.gender,
                    application.student_id,
                    application.university,
                    application.faculty,
                    application.major,
                    application.class,
                    application.cv_type,
                    application.cv_link
                ]
                );
            }
        }
        const updatedResult = await db.raw(`
            SELECT * FROM application
            WHERE application_id = ANY(?:: uuid[])`, [ids]
        );
        return updatedResult.rows;
    },
    getApplicationById: async (id: string) => {
        const result = await db.raw(
            `SELECT * FROM application WHERE application_id = ?`, [id]
        );
        return result.rows[0] || null;
    },
    getApplications: async (filters: { round?: number; status?: string; department_name?: string }) => {
        let query = `SELECT * FROM application WHERE 1=1`;
        const params: any[] = [];
        if (filters.round !== undefined) {
            query += ` AND round = ?`;
            params.push(filters.round);
        }
        if (filters.status !== undefined) {
            query += ` AND application_status = ?`;
            params.push(filters.status);
        }
        if (filters.department_name !== undefined) {
            query += ` AND department_name = ?`;
            params.push(filters.department_name);
        }

        const result = await db.raw(query, params);
        return result.rows;
    },
    rejectApplication: async (reviewed_by: string, ids: string[]) => {
        const result = await db.raw(
            `SELECT * FROM application
            WHERE application_id = ANY(?::uuid[])`, [ids]
        );
        const applications = result.rows;
        if (applications.length === 0) {
            throw new Error('No applications to reject');
        }
        if (applications.length !== ids.length) {
            throw new Error('Some applications not found');
        }
        for (const application of applications) {
            if (application.round === 3 && application.application_status === 'Approved') {
                throw new Error('Cannot reject an already approved application');
            }
        }
        await db.raw(
            `UPDATE application
            SET application_status = 'Rejected', reviewed_by = ?, reviewed_on = NOW()
            WHERE application_id = ANY(?::uuid[])`, [reviewed_by, ids]
        );
        const updatedResult = await db.raw(`
            SELECT * FROM application
            WHERE application_id = ANY(?:: uuid[])`, [ids]
        );
        return updatedResult.rows;
    },
    restoreApplication: async (reviewed_by: string, ids: string[]) => {
        const result = await db.raw(
            `SELECT * FROM application
            WHERE application_id = ANY(?::uuid[])`,
            [ids]
        )
        if (result.rows.length === 0) {
            return []
        }
        for (const app of result.rows) {
            if(app.round === 3 && app.application_status === 'Approved')
                throw new Error("Cannot restore application that has been approved in round 3")
        }
        await db.raw(
            `UPDATE application
            SET round = 1, application_status = 'Pending', reviewed_by = ?, reviewed_on = NOW()
            WHERE application_id = ANY(?::uuid[])`,
            [reviewed_by, ids]
        )
        const restoredApplications = await db.raw(
            `SELECT * FROM application
            WHERE application_id = ANY(?::uuid[])`,
            [ids]
        )
        return restoredApplications.rows
    },
}
