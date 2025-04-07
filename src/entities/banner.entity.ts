const updateBannerSchema = {
    "type": "object",
    "properties": {
        "banner_name": {
            "type": "string",
            "maxLength": 30,
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

export { updateBannerSchema }