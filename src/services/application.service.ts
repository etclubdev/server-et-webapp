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
    }
}
