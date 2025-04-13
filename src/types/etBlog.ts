export interface ETBlog {
    blog_id?: string,
    title: string,
    thumbnail_image_url: string,
    blog_author: string,
    meta_description: string,
    visible: boolean,
    content: string,
    view_count?: number,
    created_on?: Date,
    last_modified_on?: Date
}