const createPartnerSchema = {
    "type": "object",
    "properties": {
        "partner_name": {
            "type": "string",
            "maxLength": 100,
            "description": "Partner name with a maximum of 100 characters"
        },
        "partner_category_name": {
            "type": "string",
            "enum": ["Đối tác doanh nghiệp", "Đối tác chuyên gia", "Đối tác truyền thông", "Nghệ sĩ khách mời"],
            "description": "Category of the partner, only accepts predefined values"
        },
        "avatar_url": {
            "type": "string",
            "format": "uri",
            "description": "Valid URL for the partner avatar"
        },
        "short_description": {
            "type": "string",
            "maxLength": 50,
            "description": "Short description of the partner"
        },
        "email": {
            "type": "string",
            "format": "email",
            "maxLength": 320,
            "description": "Email address of the partner"
        },
        "phone_number": {
            "type": "string",
            "pattern": "^0[0-9]{9,14}$",
            "maxLength": 10,
            "description": "Phone number of the partner, must start with 0 and have 10 to 15 digits"
        },
        "visible": {
            "type": "boolean",
            "description": "Visibility status of the partner"
        },
        "note": {
            "type": "string",
            "description": "Additional note for the partner"
        },
        "created_on": {
            "type": "string",
            "format": "date-time",
            "description": "Timestamp of partner creation"
        },
        "last_modified_on": {
            "type": "string",
            "format": "date-time",
            "description": "Timestamp of last modification"
        }
    },
    "required": [
        "partner_name",
        "partner_category_id",
        "email",
        "visible"
    ]
}
const updatePartnerSchema = {
    "type": "object",
    "properties": {
        "partner_name": {
            "type": "string",
            "maxLength": 100,
            "description": "Partner name with a maximum of 100 characters"
        },
        "partner_category_name": {
            "type": "string",
            "enum": ["Đối tác doanh nghiệp", "Đối tác chuyên gia", "Đối tác truyền thông", "Nghệ sĩ khách mời"],
            "description": "Category of the partner, only accepts predefined values"
        },
        "avatar_url": {
            "type": "string",
            "format": "uri",
            "description": "Valid URL for the partner avatar"
        },
        "short_description": {
            "type": "string",
            "maxLength": 50,
            "description": "Short description of the partner"
        },
        "email": {
            "type": "string",
            "format": "email",
            "maxLength": 320,
            "description": "Email address of the partner"
        },
        "phone_number": {
            "type": "string",
            "pattern": "^0[0-9]{9,14}$",
            "maxLength": 10,
            "description": "Phone number of the partner, must start with 0 and have 10 to 15 digits"
        },
        "visible": {
            "type": "boolean",
            "description": "Visibility status of the partner"
        },
        "note": {
            "type": "string",
            "description": "Additional note for the partner"
        },
        "created_on": {
            "type": "string",
            "format": "date-time",
            "description": "Timestamp of partner creation"
        },
        "last_modified_on": {
            "type": "string",
            "format": "date-time",
            "description": "Timestamp of last modification"
        }
    },
}

export { createPartnerSchema, updatePartnerSchema };

