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
    },


    getAllFAQs: async (): Promise<FAQ[]> => {
        try {
            const faqs = await db("faq")
                .select("faq_id", "faq_category", "question", "answer", "visible");

            return faqs;
        } catch (error) {
            console.error("Error getting FAQs:", error);
            throw new Error("Error getting FAQs: " + error.message);
        }
    },

    createFAQ: async (faq: FAQ) => {
        return db("faq")
            .insert(faq)
            .returning("*");
    },

    async updateFAQ(id: string, faq: Partial<FAQ>) {
        const updatedFAQ = await db("faq")
            .where("faq_id", id)
            .update(faq)
            .returning("*");

        if (updatedFAQ.length === 0) return null;
        return updatedFAQ;
    },
    deleteFAQById: async (id: string) => {
        return db("faq")
            .where("faq_id", id)
            .del();
    },




};