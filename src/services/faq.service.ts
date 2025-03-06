import db from "../utils/db.util";
import { FAQ } from "../types/faq";

export default {
    getFAQById: async (id: string): Promise<FAQ | null> => {
        try {
            const faq = await db("faq")
                .select("faq_id", "faq_category", "question", "answer", "visible")
                .where("faq_id", id);

            return faq.length > 0 ? faq[0] : null;
        } catch (error) {
            console.error("Error getting FAQ by ID:", error);
            throw new Error("Error getting FAQ by ID: " + error.message);
        }
    }
};
