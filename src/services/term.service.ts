import db from '../utils/db.util'

export default {
    getAllTerms: async () => {
        const result = await db.raw(`SELECT term_id, term_name FROM term`);
        const terms = result.rows;

        if (!terms || terms.length === 0) 
            return null;

        return terms;
    }
}