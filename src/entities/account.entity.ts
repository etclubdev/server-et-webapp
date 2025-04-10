const updateAccountPasswordSchema = {
    "type": "object",
    "properties": {
        "password": {
            "type": "string",
            "minLength": 8,
            "description": "Password must be at least 8 characters long",
    },
    "additionalProperties": false,
}
}

export { updateAccountPasswordSchema };