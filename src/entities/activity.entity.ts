export interface Activity {
    ActivityID?: string;
    ActivityName: string;
    ActivityType: string;
    Description?: string;
    Status: string;
    StartDate: Date;
    EndDate: Date;
    Visible: boolean;
    ThumbnailImageURL: string;
    SponsoredBudget?: number;
    ActualExpenses?: number;
    Scale?: number;
}