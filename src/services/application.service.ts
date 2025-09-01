import db from "../utils/db.util";

export default {
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
    }
}

