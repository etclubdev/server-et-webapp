import db from "../utils/db.util";

export default {
    deleteActivityById: async (id: string) => {
        return db("activity")
            .where("activity_id", id)
            .del();
    },
};
