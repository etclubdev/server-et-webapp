export interface Personnel {
    personnel_id?: string; // Tự động theo định dạng PERSXXX
    personnel_name: string;
    email: string;
    dob: Date;
    gender: "Nam" | "Nữ" | "Khác";
    address?: string;
    student_id: string;
    faculty: string;
    university: string;
    major: string;
    class: string;
    cv_type?: "CV Mẫu" | "CV Tự thiết kế";
    cv_link?: string;
    cohort_name?: string;
    created_on?: Date;
    last_modified_on?: Date;
}
