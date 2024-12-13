import db from "../database/migarations/database"; 

export async function checkDatabase(): Promise<string> {
    try {
        await db.raw("SELECT 1+1 AS result");
        return "connected";
    } catch (err) {
        console.error("Database connection error:", err.message);
        return "disconnected";
    }
}
