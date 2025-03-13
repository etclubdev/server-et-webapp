export interface FAQ {
    faq_id?: string;
    faq_category: "Về ET Club" | "Về hoạt động và sự kiện" | "Về quy trình tham gia" | "Khác";
    question: string;
    answer: string;
    visible: boolean;
    created_on?: Date;
    last_modified_on?: Date;
}
