import dotenv from "dotenv";
dotenv.config();

type LogLevel = "info" | "error" | "warning" | "debug";

type LogEntry = {
    serviceName: string;
    level: LogLevel;
    timestamp: string;
    message: string;
    error?: Error | null;
};

class LogUtil {
    private static instance: LogUtil;
    private webhookUrl: string;

    private constructor(webhookUrl: string) {
        this.webhookUrl = webhookUrl;
    }

    public static getInstance(): LogUtil {
        if (!LogUtil.instance) {
            if (!process.env.DISCORD_WEBHOOK_URL) {
                throw new Error("DISCORD_WEBHOOK_URL is not defined in .env file");
            }
            LogUtil.instance = new LogUtil(process.env.DISCORD_WEBHOOK_URL);
        }
        return LogUtil.instance;
    }

    private log(level: LogLevel, serviceName: string, message: string, error?: Error): void {
        const logEntry: LogEntry = {
            serviceName,
            level,
            timestamp: new Date().toISOString(),
            message,
            error
        };

        console.log(JSON.stringify(logEntry, null, 2));

        if (level !== "debug") {
            this.sendToDiscord(logEntry);
        }
    }

    private async sendToDiscord(logEntry: LogEntry): Promise<void> {
        try {
            const response = await fetch(this.webhookUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    content: `**[${logEntry.level.toUpperCase()}]** in ${logEntry.serviceName}\n${logEntry.error ? logEntry.error.stack : ""}`
                })
            });
            if (!response.ok) {
                console.error("Failed to send log to Discord", response.statusText);
            }
        } catch (err) {
            console.error("Error sending log to Discord", err);
        }
    }

    public logError(serviceName: string, error: Error): void {
        this.log("error", serviceName, error.message, error);
    }

    public logInfo(serviceName: string, message: string): void {
        this.log("info", serviceName, message);
    }

    public logWarning(serviceName: string, message: string): void {
        this.log("warning", serviceName, message);
    }

    public logDebug(serviceName: string, message: string): void {
        this.log("debug", serviceName, message);
    }
}

// Export Singleton Instance
export const logger = LogUtil.getInstance();
