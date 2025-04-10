const updateAccountSchema = {
    "type": "object",
    "properties": {
        "sysrole_id": {
            "type": "string",
            "pattern": "^SRLE\\d{3,}$",
            "description": "System role ID of the Account, following format 'SRLEXXX' (XXX is a number)"
        },
        "personnel_id": {
            "type": "string",
            "pattern": "^PERS\\d{3,}$",
            "description": "Personnel ID of the Account, following format 'PERSXXX' (XXX is a number)"
        },
    },
    "additionalProperties": false,
}

export { updateAccountSchema };