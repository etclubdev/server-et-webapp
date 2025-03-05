import db from "../utils/db.util";
import { FAQ } from "../types/faq";

export default {
    createFAQ: async (faq: FAQ) => {
        return db("faq")
            .insert(faq)
            .returning("*");
    },
};
