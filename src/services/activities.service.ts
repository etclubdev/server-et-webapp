import db from '../database';

const activitiesService = {
    updateActivity: async ({ id, updateData }) => {
        const updateActivity = await db('activities')
            .where({ activityid: id })
            .update(updateData)
            .then(() => {
                return db('activities').where({ activityid: id })
            })

        return updateActivity;
    }
}

export default activitiesService;