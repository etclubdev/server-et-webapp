const createAccountSchema = {
    "type": "object",
    "properties": {
        "sysrole_id": {
            "type": "string",
            "maxLength": 7,
            "pattern": "^SRLE\\d{3}$",
            "description": "System role ID, must follow the format: SROLXXX",
        },
        "username": {
            "type": "string",
            "format": "email",
            "description": "User email, must have the domain @st.ueh.edu.vn"
        },
        "password": {
            "type": "string",
            "minLength": 8,
            "description": "User password"
        },
        "personnel_id": {
            "type": "string",
            "maxLength": 7,
            "pattern": "^PERS\\d{3}$",
        },
        "created_on": {
            "type": "string",
            "format": "date-time",
        },
        "last_modified_on": {
            "type": "string",
            "format": "date-time",
        },
    },
    "required": ["username", "sysrole_id", "personnel_id"]
};

export { createAccountSchema }