import db from "../utils/db.util";
import { FAQ } from "../types/faq";

export default {
    async updateFAQ(id: string, faq: Partial<FAQ>) {
        const updatedFAQ = await db("faq")
            .where("faq_id", id)
            .update(faq)
            .returning("*");

        if (updatedFAQ.length === 0) return null;
        return updatedFAQ;
    }
};
