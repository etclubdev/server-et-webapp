import db from "../utils/db.util";
import { FAQ } from "../types/faq";

export default {

    getFAQById: async (id: string): Promise<FAQ | null> => {
        try {
            const faq = await db("faq")
                .select("*")
                .where("faq_id", id);

            return faq.length > 0 ? faq[0] : null;
        } catch (error) {
            console.error("Error getting FAQ by ID:", error);
            throw new Error("Error getting FAQ by ID: " + error.message);
        }
    },


    getAllFAQs: async (): Promise<Record<string, FAQ[]>> => {
        try {

            const faqs = await db("faq").select("*");

            const groupedFAQs: Record<string, FAQ[]> = {};

            faqs.forEach((faq) => {
                const category = faq.faq_category || "Khác";
                if (!groupedFAQs[category]) {
                    groupedFAQs[category] = [];
                }
                groupedFAQs[category].push(faq);
            });

            return groupedFAQs;
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

    deleteFAQs: async (faqs: string[]) => {
        if (!faqs || !Array.isArray(faqs) || faqs.length === 0) {
            throw new Error("Invalid Data");
        }

        return db.transaction(async (trx) => {
            let affectedRows = 0;
            for (const faqId of faqs) {
                const deletedFAQs = await trx("faq")
                    .where('faq_id', faqId)
                    .del();
                affectedRows += deletedFAQs;
            }

            return affectedRows;
        });
    },
    getFAQsByCategory: async (faq_category: string[]) => {
        const placeholders = faq_category.map(() => '?').join(', ');

        const result = await db.raw(
            `SELECT * FROM faq WHERE faq_category IN (${placeholders})`,
            faq_category
        );
        
        const faqs = result.rows;

        if (faqs.length == 0)
            return [];

        return faqs;
    }


};