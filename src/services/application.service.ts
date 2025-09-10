import db from '../utils/db.util';
import personnelService from './personnel.service';

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
                const isUnique = await personnelService.checkUniqueEmail(application.email);

                if (!isUnique) {
                    return {
                        isUnique,
                        updatedApplications: []
                    };
                }

                await db.raw(
                    `UPDATE application 
                SET application_status = 'Approved', reviewed_by = ?, reviewed_on = NOW()
                WHERE application_id = ?`, [reviewed_by, application.application_id]
                );

                const termResult = await db.raw(
                    `SELECT term_id FROM term ORDER BY start_date DESC LIMIT 1`
                );
                const term_id = termResult.rows[0]?.term_id;

                await personnelService.createPersonnelWithStatus(
                    {
                        personnel_name: application.full_name,
                        phone_number: application.phone_number,
                        email: application.email,
                        dob: application.dob,
                        gender: application.gender,
                        address: application.address ?? null,
                        student_id: application.student_id,
                        university: application.university,
                        faculty: application.faculty,
                        major: application.major,
                        class: application.class,
                        cv_type: application.cv_type,
                        cv_link: application.cv_link,
                        cohort_name: application.cohort_name ?? null
                    },
                    {
                        term_id,
                        department_name: application.department_name,
                        position_name: 'Cộng tác viên',
                        personnel_status: 'Đang hoạt động'
                    }
                );
            }
        }
        const updatedResult = await db.raw(`
            SELECT * FROM application
            WHERE application_id = ANY(?:: uuid[])`, [ids]
        );
        return {
            isUnique: true,
            updatedApplications: updatedResult.rows
        };
    },
    deleteApplications: async (applications: string[]) => {
        if (!applications || !Array.isArray(applications) || applications.length === 0) {
            throw new Error("Invalid Data");
        }

        const result = await db.raw(
            `DELETE FROM application
            WHERE application_id = ANY(ARRAY[${applications.map(() => '?').join(',')}]::uuid[])`,
            applications
        );

        return result.rowCount;

    },
    getApplicationById: async (id: string) => {
        const result = await db.raw(
            `SELECT * FROM application WHERE application_id = ?`, [id]
        );
        return result.rows[0] || null;
    },
    getApplications: async (filters: { round?: number; status?: string[]; department_name?: string[] }) => {
        let query = `SELECT * FROM application WHERE 1=1`;
        const params: any[] = [];

        if (filters.round !== undefined) {
            query += ` AND round = ?`;
            params.push(filters.round);
        }

        if (filters.status && filters.status.length > 0) {
            query += ` AND application_status = ANY(?::application_status_enum[])`;
            params.push(filters.status);
        }

        if (filters.department_name && filters.department_name.length > 0) {
            query += ` AND department_name = ANY(?::department_enum[])`;
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
            if (app.round === 3 && app.application_status === 'Approved')
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
    statisticsApplication: async () => {
        // Total applications
        const totalResult = await db.raw(`SELECT COUNT(*) AS total_applications FROM application`);
        const total_applications = Number(totalResult.rows[0]?.total_applications || 0);

        // Total members
        const memberResult = await db.raw(`
            SELECT COUNT(*) AS total_members 
            FROM application
            WHERE application_status = 'Approved' AND round = 3
        `);
        const total_members = Number(memberResult.rows[0]?.total_members || 0);

        // By major (department_name)
        const majorResult = await db.raw(`
        SELECT department_name AS major, COUNT(*) AS total_applications
        FROM application
        GROUP BY department_name
    `);

        // By cohort_name
        const cohortResult = await db.raw(`
        SELECT cohort_name, COUNT(*) AS total_applications
        FROM application
        GROUP BY cohort_name
    `);

        // By gender
        const genderResult = await db.raw(`
        SELECT gender, COUNT(*) AS total_applications
        FROM application
        GROUP BY gender
    `);

        const stats = {
            by_major: majorResult.rows,
            by_cohort: cohortResult.rows,
            by_gender: genderResult.rows,
            totals: {
                total_applications,
                total_members
            }
        };
        return stats;
    },
}
