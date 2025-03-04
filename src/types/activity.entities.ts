export interface Activity {
    activityId?: string;
    tiltle: string;
    category: string;
    metaDescription?: string;
    thumbnail: string;
    startDate: Date;
    endDate: Date;
    visible: boolean;
    content: string;
}