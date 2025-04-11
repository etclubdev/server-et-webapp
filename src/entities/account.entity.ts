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

export { updateAccountSchema };