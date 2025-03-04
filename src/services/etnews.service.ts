import db from '../utils/db.util'

export default {
    deleteETNews: async ( id: string ) => {
        return db('et_news')
            .where('etnews_id', id)
            .del()
    }
}
