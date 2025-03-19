const updateAccountSchema = {
    "type": "object",
    "properties": {
        "sysrole_id": {
            "type": "string",
            "pattern": "^SRLE\\d{3,}$",
            "description": "System role ID of the Account, following format 'SRLEXXX' (XXX is a number)"
        },
        "password": {
            "type": "string",
            "minLength": 8,
            "description": "Password of the account"
        }
    }
}

export { updateAccountSchema };