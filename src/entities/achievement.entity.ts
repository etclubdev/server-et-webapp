const createAchievementSchema = {
    "type": "object",
    "properties": {
        "achievement_id": {
            "type": "string",
            "pattern": "^ACHV\\d{3}$",
            "description": "Unique identifier for the achievement, formatted as ACHVXXX"
        },
        "achievement_name": {
            "type": "string",
            "maxLength": 30,
            "pattern": "^[A-Za-z ]+$",
            "description": "Achievement name, must not contain numbers or special characters"
        },
        "highlight_number": {
            "type": "string",
            "maxLength": 10,
            "description": "Highlighted number representing the achievement"
        },
        "visible": {
            "type": "boolean",
            "description": "Determines whether the achievement is visible (TRUE = visible, FALSE = invisible)"
        },
        "created_on": {
            "type": "string",
            "format": "date-time",
            "default": new Date().toISOString(),
            "description": "Timestamp of achievement creation"
        },
        "last_modified_on": {
            "type": "string",
            "format": "date-time",
            "default": new Date().toISOString(),
            "description": "Timestamp of last modification"
        }
    },
    "required": ["achievement_name", "highlight_number", "visible"]
};

export { createAchievementSchema };
