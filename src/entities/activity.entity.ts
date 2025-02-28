export interface Activity {
    activityId?: string; //Auto generated ID (ACT-XXXXXX)
    title: string;
    category: "Workshop" | "Guide" | "Startup" | "Tech News" | "Others";
    metaDescription?: string;
    thumbnailImage?: string;
    startDate: Date;
    endDate: Date;
    visible: boolean;
    content: string;
    createdAt?: Date;
    updatedAt?: Date;
}