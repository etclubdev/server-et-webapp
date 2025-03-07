export interface ETNews {
    etnews_id?: string;
    title: string;
    etnews_category: string;
    meta_description?: string;
    thumbnail_image_url: string;
    source: string;
    visible: boolean;
    content: string;
    view_count?: number;
    created_on?: string;
    last_modified_on?: string;
}