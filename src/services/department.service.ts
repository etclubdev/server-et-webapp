import db from '../utils/db.util';

const departmentService = {

    checkDepartmentMatch: async (userId1: string, userId2: string): Promise<boolean> => {
        try {
            const [user1, user2] = await Promise.all([
                db('personnel')
                    .join('personnel_status', 'personnel.personnel_id', '=', 'personnel_status.personnel_id')
                    .select('personnel_status.department_name')
                    .where('personnel.personnel_id', userId1)
                    .first(),
                db('personnel')
                    .join('personnel_status', 'personnel.personnel_id', '=', 'personnel_status.personnel_id')
                    .select('personnel_status.department_name')
                    .where('personnel.personnel_id', userId2)
                    .first()
            ]);

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
    checkDepartmentMatchWithApplication: async (userId: string, applicationId: string[]): Promise<boolean> => {
        try {
            const [user, application] = await Promise.all([
                db('personnel')
                    .join('personnel_status', 'personnel.personnel_id', '=', 'personnel_status.personnel_id')
                    .select('personnel_status.department_name')
                    .where('personnel.personnel_id', userId)
                    .first(),
                db('application')
                    .select('department_name')
                    .whereIn('application_id', applicationId)
                    .first()
            ]);

            if (user && application && user.department_name === application.department_name) {
                console.log(`User ${user} and Application ${application} are in the same department: ${user.department_name}`);
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
            const user = await db('personnel')
                .join('personnel_status', 'personnel.personnel_id', '=', 'personnel_status.personnel_id')
                .select('personnel_status.department_name')
                .where('personnel.personnel_id', userId)
                .first();

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