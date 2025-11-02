const authSchema = {
    "type": "object",
    "properties": {
        "username": {
            "type": "string",
            "description": "Username to login"
        },
        "password": {
            "type": "string",
            "minLength": 8,
            "description": "User password to login"
        }
    },
    "required": ["username", "password"]
}

export { authSchema };