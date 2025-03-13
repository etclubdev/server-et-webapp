import db from "../utils/db.util";
import { FAQ } from "../types/faq";

export default {
    getAllFAQs: async (): Promise<FAQ[]> => {
        try {
            const faqs = await db("faq")
                .select("faq_id", "faq_category", "question", "answer", "visible");

            return faqs;
        } catch (error) {
            console.error("Error getting FAQs:", error);
            throw new Error("Error getting FAQs: " + error.message);
        }
    }
};
