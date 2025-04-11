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

const updateAccountSchema = {
    "type": "object",
    "properties": {
        "sysrole_id": {
            "type": "string",
            "pattern": "^SRLE\\d{3,}$",
            "description": "System role ID of the Account, following format 'SRLEXXX' (XXX is a number)"
        },
    },
    "additionalProperties": false,
}

export { updateAccountSchema, updateAccountPasswordSchema };
