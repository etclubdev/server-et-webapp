interface Application {
    application_id?: string;
    full_name: string;
    phone_number: string;
    email: string;
    dob: string;
    gender: 'Nam' | 'Nữ' | 'Khác';
    student_id: string;
    university: string;
    faculty: string;
    major: string;
    class: string;
    cv_type: 'CV mẫu' | 'CV tự thiết kế';
    cv_link: string;
    apply_date?: string; 
    round?: number;
    application_status?: 'Pending' | 'Approved' | 'Rejected';
    department_name:
    | 'Ban Chuyên môn'
    | 'Ban Truyền thông'
    | 'Ban Nhân sự - Tổ chức'
    | 'Ban Sự kiện'
    | 'Ban Tài chính - Đối ngoại';
    note?: string;
    cohort_name: string;
    reviewed_by?: string | null;
    reviewed_on?: string | null;
}
interface ApproveApplicationResult {
    isUnique: boolean;
    updatedApplications: Application[];
}
interface ApplicationStatistics {
    by_major: { major: string; total_applications: number }[];
    by_cohort: { cohort_name: string; total_applications: number }[];
    by_gender: { gender: string; total_applications: number }[];
    totals: {
        total_applications: number;
        total_members: number;
    };
}
export { Application, ApproveApplicationResult, ApplicationStatistics };