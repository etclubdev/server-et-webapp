import db from '../utils/db.util'

export default {
    getAllTerms: async () => {
        const terms = await db('term')
        .select('term_id', 'term_name')

        if (terms.length === 0) 
            return null;

        return terms;
    }
}