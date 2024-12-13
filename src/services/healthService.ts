import axios from "axios";

import { checkDatabase } from "./databaseService";

export async function checkExternalAPI(): Promise<string> {
    try {
        await axios.get("https://jsonplaceholder.typicode.com/posts");
        return "connected";
    } catch (err) {
        console.error("External API error:", err.message);
        return "disconnected";
    }
}

export async function getHealthStatus(startTime: number) {
    const uptime = Math.floor((Date.now() - startTime) / 1000);

    const [databaseStatus, externalApiStatus] = await Promise.all([
        checkDatabase(),
        checkExternalAPI(),
    ]);


    const isHealthy = databaseStatus === "connected" && externalApiStatus === "connected";

    return {
        status: isHealthy ? "healthy" : "unhealthy",
        uptime,
        dependencies: [
            { name: "database", status: databaseStatus },
            { name: "externalAPI", status: externalApiStatus },
        ],
    };
}
