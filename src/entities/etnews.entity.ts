import Ajv, { Schema } from "ajv";
import addFormats from "ajv-formats";

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

const createNewsSchema: Schema = {
    type: "object",
    properties: {
        "title": {
            "type": "string",
            "maxLength": 60,
            "description": "News title with a maximum of 60 characters"
        },
        "etnews_category": {
            "type": "string",
            "enum": ["Công nghệ Việt Nam", "Công nghệ thế giới", "Chính phủ số", "Khác"],
            "description": "Category must be one of: Công Nghệ Việt Nam, Công Nghệ thế giới, Chính phủ số, Khác."
        },
        "meta_description": {
            "type": "string",
            "description": "Short meta description of the news"
        },
        "thumbnail_image_url": {
            "type": "string",
            "format": "uri",
            "description": "URL of the thumbnail image"
        },
        "source": {
            "type": "string",
            "description": "Source of the news"
        },
        "visible": {
            "type": "boolean",
            "description": "Visibility of the news"
        },
        "content": {
            "type": "string",
            "minLength": 50,
            "description": "Content of the news with a minimum length of 50 characters"
        },
        "view_count": {
            "type": "number",
            "minimum": 0,
            "default": 0,
            "description": "Number of views of the news, default to 0"  // Optional field, only required if tracking view count is enabled  // Optional field, only required if tracking view count is enabled  // Optional field, only required if tracking view count is enabled  // Optional field, only required if tracking view count is enabled  // Optional field, only required if tracking view count is enabled  // Optional field, only required if tracking view count is enabled  // Optional field, only required if tracking view
        },
        "created_on": {
            "type": "string",
            "format": "date-time",
            "description": "Date and time when the news was created"
        },
        "last_modified_on": {
            "type": "string",
            "format": "date-time",
            "description": "Date and time when the news was last modified"
        },
    },
    required: [
        "title",
        "etnews_category",
        "thumbnail_image_url",
        "source",
        "visible",
        "content",
    ],
    additionalProperties: false,
};

const updateNewsSchema: Schema = {
    type: "object",
    properties: {
        "title": {
            "type": "string",
            "maxLength": 60,
            "description": "News title with a maximum of 60 characters"
        },
        "etnews_category": {
            "type": "string",
            "enum": ["Công Nghệ Việt Nam", "Công Nghệ thế giới", "Chính phủ số", "Khác"],
            "description": "Category must be one of: Công Nghệ Việt Nam, Công Nghệ thế giới, Chính phủ số, Khác."
        },
        "meta_description": {
            "type": "string",
            "description": "Short meta description of the news"
        },
        "thumbnail_image_url": {
            "type": "string",
            "format": "uri",
            "description": "URL of the thumbnail image"
        },
        "source": {
            "type": "string",
            "description": "Source of the news"
        },
        "visible": {
            "type": "boolean",
            "description": "Visibility of the news"
        },
        "content": {
            "type": "string",
            "minLength": 50,
            "description": "Content of the news with a minimum length of 50 characters"
        },
        "view_count": {
            "type": "number",
            "minimum": 0,
            "default": 0,
            "description": "Number of views of the news, default to 0"  // Optional field, only required if tracking view count is enabled  // Optional field, only required if tracking view count is enabled  // Optional field, only required if tracking view count is enabled  // Optional field, only required if tracking view count is enabled  // Optional field, only required if tracking view count is enabled  // Optional field, only required if tracking view count is enabled  // Optional field, only required if tracking view
        },
        "created_on": {
            "type": "string",
            "format": "date-time",
            "description": "Date and time when the news was created"
        },
        "last_modified_on": {
            "type": "string",
            "format": "date-time",
            "description": "Date and time when the news was last modified"
        },
    },
};
export { createNewsSchema, updateNewsSchema };