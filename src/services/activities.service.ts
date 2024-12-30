import db from '../database';

const activitiesService = {
    deleteActivity: async ( id ) => {
        const deleteActivity = await db('activities')
            .where({activityid: id})
            .del();

        return deleteActivity;
    }
}

export default activitiesService;