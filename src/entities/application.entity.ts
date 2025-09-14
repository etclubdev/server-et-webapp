const createApplicationSchema = {
    type: 'object',
    properties: {
        application_id: {
            type: 'string',
            format: 'uuid',
            description: 'Unique identifier for the application'
        },
        full_name: {
            type: 'string',
            description: 'Full name of the applicant'
        },
        phone_number: {
            type: 'string',
            pattern: '^0[0-9]{9}$',
            description: 'Phone number of the applicant'
        },
        email: {
            type: 'string',
            format: 'email',
            maxLength: 320,
            pattern: '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$',
            description: 'Email address of the applicant'
        },
        dob: {
            type: 'string',
            format: 'date',
            description: 'Date of birth of the applicant'
        },
        gender: {
            type: 'string',
            enum: ['Nam', 'Nữ', 'Khác'],
            description: 'Gender of the applicant'
        },
        student_id: {
            type: 'string',
            pattern: '^[0-9]{10,}$',
            description: 'Student ID of the applicant'
        },
        university: {
            type: 'string',
            description: 'University of the applicant'
        },
        faculty: {
            type: 'string',
            description: 'Faculty of the applicant'
        },
        major: {
            type: 'string',
            description: 'Major of the applicant'
        },
        class: {
            type: 'string',
            description: 'Class of the applicant'
        },
        cv_type: {
            type: 'string',
            enum: ['CV mẫu', 'CV tự thiết kế'],
            description: 'Type of CV submitted'
        },
        cv_link: {
            type: 'string',
            pattern: '^(https?|ftp)://[^\\s/$.?#].[^\\s]*$',
            description: 'Link to the CV file'
        },
        apply_date: {
            type: 'string',
            format: 'date-time',
            description: 'Date and time the application was submitted'
        },
        round: {
            type: 'integer',
            minimum: 1,
            maximum: 3,
            description: 'Current round of the application process'
        },
        application_status: {
            type: 'string',
            enum: ['Pending', 'Approved', 'Rejected'],
            description: 'Status of the application'
        },
        department_name: {
            type: 'string',
            enum: [
                'Ban Chuyên môn',
                'Ban Truyền thông',
                'Ban Nhân sự - Tổ chức',
                'Ban Sự kiện',
                'Ban Tài chính - Đối ngoại'
            ],
            description: 'Department the applicant is applying to'
        },
        note: {
            type: 'string',
            description: 'Additional notes about the application'
        },
        cohort_name: {
            type: 'string',
            pattern: '^K[0-9]{2}$',
            description: 'Cohort name of the applicant'
        },
        reviewed_by: {
            type: ['string', 'null'],
            format: 'uuid',
            description: 'Personnel ID of the reviewer'
        },
        reviewed_on: {
            type: ['string', 'null'],
            format: 'date-time',
            description: 'Date and time the application was reviewed'
        }
    },
    required: [
        'full_name',
        'phone_number',
        'email',
        'dob',
        'gender',
        'student_id',
        'university',
        'faculty',
        'major',
        'class',
        'cv_type',
        'cv_link',
        'department_name',
        'cohort_name'
    ],
    additionalProperties: false
};

export { createApplicationSchema };