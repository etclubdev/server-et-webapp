
const createFAQSchema = {
    "type": "object",
    "properties": {
        "faq_category": {
            "type": "string",
            "enum": ["ET Club", "Hoạt động và sự kiện", "Quy trình tham gia", "Khác"],
            "description": "Category of the FAQ"
        },
        "question": {
            "type": "string",
            "description": "The frequently asked question"
        },
        "answer": {
            "type": "string",
            "description": "The answer to the question"
        },
        "visible": {
            "type": "boolean",
            "default": true,
            "description": "Indicates whether the FAQ is visible on the homepage"
        },
        "created_on": {
            "type": "string",
            "format": "date-time",
            "default": new Date().toISOString(),
            "description": "Timestamp of FAQ creation"
        },
        "last_modified_on": {
            "type": "string",
            "format": "date-time",
            "default": new Date().toISOString(),
            "description": "Timestamp of last modification"
        }
    },
    "required": ["faq_category", "question", "answer", "visible"]
}
const updateFAQSchema = {
    "type": "object",
    "properties": {
        "faq_category": {
            "type": "string",
            "enum": ["ET Club", "Hoạt động và sự kiện", "Quy trình tham gia", "Khác"],
            "description": "Category of the FAQ"
        },
        "question": {
            "type": "string",
            "description": "The frequently asked question"
        },
        "answer": {
            "type": "string",
            "description": "The answer to the question"
        },
        "visible": {
            "type": "boolean",
            "default": true,
            "description": "Indicates whether the FAQ is visible on the homepage"
        },
        "created_on": {
            "type": "string",
            "format": "date-time",
            "default": new Date().toISOString(),
            "description": "Timestamp of FAQ creation"
        },
        "last_modified_on": {
            "type": "string",
            "format": "date-time",
            "default": new Date().toISOString(),
            "description": "Timestamp of last modification"
        }
    },
}



export { createFAQSchema, updateFAQSchema };