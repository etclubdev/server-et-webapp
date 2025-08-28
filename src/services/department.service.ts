import db from '../utils/db.util';

const departmentService = {

    checkDepartmentMatch: async (userId1: string, userId2: string): Promise<boolean> => {
        try {
            const [result1, result2] = await Promise.all([
                db.raw(
                    `
                    SELECT ps.department_name
                    FROM personnel p
                    JOIN personnel_status ps ON p.personnel_id = ps.personnel_id
                    WHERE p.personnel_id = ?
                    `,
                    [userId1]
                ),
                db.raw(
                    `
                    SELECT ps.department_name
                    FROM personnel p
                    JOIN personnel_status ps ON p.personnel_id = ps.personnel_id
                    WHERE p.personnel_id = ?
                    `,
                    [userId2]
                )
            ]);
            const user1 = result1.rows[0];
            const user2 = result2.rows[0];
            if (user1 && user2 && user1.department_name === user2.department_name) {
                console.log(`User ${userId1} and User ${userId2} are in the same department: ${user1.department_name}`);
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error checking department match:', error);
            throw new Error('Error checking department match: ' + error.message);
        }
    },


    checkUserDepartment: async (userId: string, targetDepartment: string): Promise<boolean> => {
        try {
            const result = await db.raw(
                `
                SELECT ps.department_name
                FROM personnel p
                JOIN personnel_status ps ON p.personnel_id = ps.personnel_id
                WHERE p.personnel_id = ?
                `,
                [userId]
            );
            const user = result.rows[0];
            if (user && user.department_name === targetDepartment) {
                console.log(`User ${userId} belongs to department: ${user.department_name}`);
                return true;
            }
            console.log(`User ${userId} does not belong to department: ${targetDepartment}`);
            return false;
        } catch (error) {
            console.error('Error checking user department:', error);
            throw new Error('Error checking user department: ' + error.message);
        }
    }
};

export default departmentService;