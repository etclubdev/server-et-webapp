const createBannerSchema = { 
    "type": "object",
    "properties": {
        "banner_name": {
            "type": "string",
            "maxLength": 30,
            "description": "Name of the banner"
        },
        "image_url": {
            "type": "string",
            "description": "URL of the banner image",
            "format": "uri"
        },
        "visible": {
            "type": "boolean",
            "default": false,
            "description": "Indicates whether the banner is visible"
        },
    },
    "required": [
        "banner_name", "image_url", "visible"
    ],
}

export { createBannerSchema };