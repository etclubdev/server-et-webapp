import db from "../utils/db.util";
import { Personnel } from "../types/personnel";

export default {
    createPersonnelWithStatus: async (
        personnel: Personnel,
        status: {
            term_id: string;
            department_name: string;
            position_name: string;
            personnel_status: string;
        }
    ) => {
        return await db.transaction(async (trx) => {
            // 1. Insert personnel
            const [newPersonnel] = await trx("personnel")
                .insert(personnel)
                .returning("*");

            // 2. Insert personnel_status (dùng term_id từ client)
            const [newStatus] = await trx("personnel_status")
                .insert({
                    personnel_id: newPersonnel.personnel_id,
                    term_id: status.term_id,
                    department_name: status.department_name,
                    position_name: status.position_name,
                    personnel_status: status.personnel_status
                })
                .returning("*");

            return {
                personnel: newPersonnel,
                status: newStatus
            };
        });
    }
};
