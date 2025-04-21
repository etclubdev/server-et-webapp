import db from '../utils/db.util';

export const checkDepartmentMatch = async (userId1: string, userId2: string) => {
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
};