const createBannerSchema = { 
    "type": "object",
    "properties": {
        "banner_name": {
            "type": "string",
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

const updateBannerSchema = {
    "type": "object",
    "properties": {
        "banner_name": {
            "type": "string",
            "description": "Name of the banner"
        },
        "image_url": {
            "type": "string",
            "format": "uri",
            "description": "URL of the banner image"
        },
        "visible": {
            "type": "boolean",
            "description": "Visibility of the banner"
        },
    },
}


export { createBannerSchema, updateBannerSchema };