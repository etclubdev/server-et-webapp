const createPersonnelWithStatusSchema = {
    "type": "object",
    "properties": {
        "personnel": {
            "type": "object",
            "properties": {
                "personnel_name": { "type": "string", "maxLength": 30 },
                "email": { "type": "string", "format": "email", "maxLength": 320 },
                "dob": { "type": "string", "format": "date" },
                "gender": { "type": "string", "enum": ["Nam", "Nữ", "Khác"] },
                "address": { "type": "string", "maxLength": 263 },
                "student_id": { "type": "string", "maxLength": 20 },
                "faculty": { "type": "string", "maxLength": 100 },
                "university": { "type": "string", "maxLength": 50 },
                "major": { "type": "string", "maxLength": 100 },
                "class": { "type": "string", "maxLength": 10 },
                "cv_type": { "type": "string", "enum": ["CV mẫu", "CV tự thiết kế"] },
                "cv_link": { "type": "string", "format": "uri" },
                "course_name": {
                    "type": "string",
                    "pattern": "^K([1-9]?[0-9])$",
                    "description": "Must match format K0 to K99"
                }
            },
            "required": [
                "personnel_name", "email", "dob", "gender",
                "student_id", "faculty", "university", "major", "class"
            ]
        },
        "status": {
            "type": "object",
            "properties": {
                "term_id": { "type": "string", "pattern": "^TERM[0-9]{3}$" },
                "department_name": {
                    "type": "string",
                    "enum": [
                        "Ban Kỹ thuật - Công nghệ",
                        "Ban Truyền thông",
                        "Ban Nhân sự - Tổ chức",
                        "Ban Sự kiện",
                        "Ban Tài chính - Đối ngoại"
                    ]
                },
                "position_name": {
                    "type": "string",
                    "enum": [
                        "Chủ nhiệm",
                        "Phó chủ nhiệm",
                        "Thành viên ban chủ nhiệm",
                        "Trưởng ban",
                        "Phó ban",
                        "Thành viên",
                        "Cộng tác viên"
                    ]
                },
                "personnel_status": {
                    "type": "string",
                    "enum": ["Đang hoạt động", "Cựu thành viên", "Ứng viên"]
                }
            },
            "required": ["term_id", "department_name", "position_name", "personnel_status"]
        }
    },
    "required": ["personnel", "status"]
};

export { createPersonnelWithStatusSchema };
