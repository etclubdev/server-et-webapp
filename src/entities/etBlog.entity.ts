const createBlogSchema = {
  "type": "object",
  "properties": {
    "title": {
      "type": "string",
      "maxLength": 250,
      "description": "Blog title with a maximum of 60 characters"
    },
    "thumbnail_image_url": {
      "type": "string",
      "description": "Valid URL for the blog thumbnail"
    },
    "blog_author": {
      "type": "string",
      "maxLength": 60,
      "description": "Author's name with a max length of 60 characters"
    },
    "meta_description": {
      "type": "string",
      "description": "Short meta description of the blog"
    },
    "visible": {
      "type": "boolean",
      "description": "Visibility status of the blog"
    },
    "content": {
      "type": "string",
      "minLength": 50,
      "description": "Main blog content with at least 50 characters"
    },
    "view_count": {
      "type": "integer",
      "minimum": 0,
      "default": 0,
      "description": "Number of views, defaults to 0"
    },
    "created_on": {
      "type": "string",
      "format": "date-time",
      "description": "Timestamp of blog creation"
    },
    "last_modified_on": {
      "type": "string",
      "format": "date-time",
      "description": "Timestamp of last modification"
    }
  },
  "required": ["title", "thumbnail_image_url", "blog_author", "meta_description", "visible", "content"]
}

const updateBlogSchema = {
  "type": "object",
  "properties": {
    "title": {
      "type": "string",
      "maxLength": 250,
      "description": "Blog title with a maximum of 60 characters"
    },
    "thumbnail_image_url": {
      "type": "string",
      "description": "Valid URL for the blog thumbnail"
    },
    "blog_author": {
      "type": "string",
      "maxLength": 60,
      "description": "Author's name with a max length of 60 characters"
    },
    "meta_description": {
      "type": "string",
      "description": "Short meta description of the blog"
    },
    "visible": {
      "type": "boolean",
      "description": "Visibility status of the blog"
    },
    "content": {
      "type": "string",
      "minLength": 50,
      "description": "Main blog content with at least 50 characters"
    },
    "view_count": {
      "type": "integer",
      "minimum": 0,
      "default": 0,
      "description": "Number of views, defaults to 0"
    },
    "created_on": {
      "type": "string",
      "format": "date-time",
      "description": "Timestamp of blog creation"
    },
    "last_modified_on": {
      "type": "string",
      "format": "date-time",
      "description": "Timestamp of last modification"
    }
  },
}

export { createBlogSchema, updateBlogSchema };
