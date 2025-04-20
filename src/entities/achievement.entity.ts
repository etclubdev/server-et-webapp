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
            "description": "Achievement name"
        },
        "highlight_number": {
            "type": "string",
            "maxLength": 10,
            "description": "Highlighted number representing the achievement"
        },
        "visible": {
            "type": "boolean",
            "description": "Determines whether the achievement is visible (TRUE = visible, FALSE = invisible)"
        }
    },
    "required": ["achievement_name", "highlight_number", "visible"]
};

const updateAchievementSchema = {
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
            "description": "Achievement name"
        },
        "highlight_number": {
            "type": "string",
            "maxLength": 10,
            "description": "Highlighted number representing the achievement"
        },
        "visible": {
            "type": "boolean",
            "description": "Determines whether the achievement is visible (TRUE = visible, FALSE = invisible)"
        }
    },

};

export { createAchievementSchema, updateAchievementSchema };
