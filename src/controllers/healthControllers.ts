import { Request, Response } from "express";

import { getHealthStatus } from "../services/healthService";

const startTime = Date.now();

export async function getHealth(req: Request, res: Response): Promise<void> {
    try {
        const healthStatus = await getHealthStatus(startTime);
        const isHealthy = healthStatus.status === "healthy";

        res.status(isHealthy ? 200 : 500).json(healthStatus);
    } catch (err) {
        console.error("Health check error:", err.message);
        res.status(500).json({ status: "unhealthy", error: err.message });
    }
}
