import db from '../utils/db.util'

export default {
    getAllTerms: async () => {
        const terms = await db('term')
        .select('term_id', 'term_name')

        if (terms.length === 0) 
            return null;

        return terms;
    },
    createTerm: async (term) => {
        const newTerm = await db('term')
            .insert(term)
            .returning(['term_id', 'term_name']);

        return newTerm;
    }
}