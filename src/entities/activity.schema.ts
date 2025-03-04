const updateActivitySchema = {
    "type": "object",
    "properties": {
        "title": {
            "type": "string",
            "maxLength": 60,
            "pattern": "^[^0-9\\W].*",
            "description": "Activity title, max 60 characters, cannot start with number or special character"
        },
        "activity_category": {
            "type": "string",
            "enum": ["Talkshow/Workshop", "Cuộc thi", "Game", "Hoạt động truyền thông", "Hoạt động nội bộ"],
            "description": "Category of the activity"
        },
        "meta_description": {
            "type": "string",
            "maxLength": 160,
            "description": "Short description of the activity"
        },
        "thumbnail_image_url": {
            "type": "string",
            "format": "uri",
            "description": "Valid URL for the activity thumbnail image"
        },
        "start_date": {
            "type": "string",
            "format": "date",
            "description": "Date when the activity starts"
        },
        "end_date": {
            "type": "string",
            "format": "date",
            "description": "Date when the activity ends"
        },
        "register_number": {
            "type": "integer",
            "minimum": 0,
            "default": 0,
            "description": "Total number of registered users"
        },
        "participated_number": {
            "type": "integer",
            "minimum": 0,
            "default": 0,
            "description": "Total number of actual participants"
        },
        "expense_money": {
            "type": "integer",
            "minimum": 0,
            "default": 0,
            "description": "Total expense of the activity"
        },
        "visible": {
            "type": "boolean",
            "default": true,
            "description": "Indicates whether the activity is visible"
        },
        "content": {
            "type": "string",
            "minLength": 50,
            "description": "Main content of the activity, saved as HTML"
        },
        "view_count": {
            "type": "integer",
            "minimum": 0,
            "default": 0,
            "description": "Total number of views"
        },
        "created_on": {
            "type": "string",
            "format": "date-time",
            "default": new Date().toISOString(),
            "description": "Timestamp of activity creation"
        },
        "last_modified_on": {
            "type": "string",
            "format": "date-time",
            "default": new Date().toISOString(),
            "description": "Timestamp of last modification"
        }
    },

};



export { updateActivitySchema };
