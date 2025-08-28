import db from "../utils/db.util";
import { FAQ } from "../types/faq";

export default {

    getFAQById: async (id: string): Promise<FAQ | null> => {
        const result = await db.raw(
            `SELECT * FROM faq WHERE faq_id = ?`,
            [id]
        );
        const faq = result.rows;
        return faq.length > 0 ? faq[0] : null;
    },

    getAllFAQs: async (): Promise<Record<string, FAQ[]>> => {
        const result = await db.raw(`SELECT * FROM faq`);
        const faqs = result.rows;

        const groupedFAQs: Record<string, FAQ[]> = {};

        faqs.forEach((faq) => {
            const category = faq.faq_category || "Khác";
            if (!groupedFAQs[category]) {
                groupedFAQs[category] = [];
            }
            groupedFAQs[category].push(faq);
        });

        return groupedFAQs;
    },

    createFAQ: async (faq: FAQ) => {
        const result = await db.raw(
            `INSERT INTO faq (question, answer, faq_category, visible)
         VALUES (:question, :answer, :faq_category, :visible)
         RETURNING *`,
            {
                question: faq.question,
                answer: faq.answer,
                faq_category: faq.faq_category,
                visible: faq.visible
            }
        );

        return result.rows[0];
    },

    updateFAQ: async (id: string, faq: Partial<FAQ>) => {
        const updatedFAQ = await db("faq")
            .where("faq_id", id)
            .update(faq)
            .returning("*");

        if (updatedFAQ.length === 0) return null;
        return updatedFAQ;
    },

    deleteFAQById: async (id: string) => {
        const result = await db.raw(
            `DELETE FROM faq WHERE faq_id = ? RETURNING faq_id`,
            [id]
        );
        return result.rows.length;
    },

    deleteFAQs: async (faqs: string[]) => {
        if (!faqs || !Array.isArray(faqs) || faqs.length === 0) {
            throw new Error("Invalid Data");
        }

        const result = await db.raw(
            `DELETE FROM faq
             WHERE faq_id = ANY(:faqs::uuid[])
             RETURNING faq_id`,
            { faqs }
        );

        return result.rows.length;
    }

};
