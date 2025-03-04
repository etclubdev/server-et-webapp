export interface Activity {
    activity_id?: string;
    title: string;
    activity_category: "Talkshow/Workshop" | "Cuộc thi" | "Game" | "Hoạt động truyền thông" | "Hoạt động nội bộ";
    meta_description?: string;
    thumbnail_image_url: string;
    start_date: Date;
    end_date: Date;
    register_number?: number;
    participated_number?: number;
    expense_money?: number;
    visible: boolean;
    content: string;
    view_count?: number;
    created_on?: Date;
    last_modified_on?: Date;
}
