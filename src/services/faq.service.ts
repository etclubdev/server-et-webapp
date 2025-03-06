import db from "../utils/db.util";

export default {
    deleteFAQById: async (id: string) => {
        return db("faq")
            .where("faq_id", id)
            .del();
    },
};
