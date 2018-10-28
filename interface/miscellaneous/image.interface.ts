export interface Image {

    /**
     * Can be non-IGDB URL
     */
    url: string,

    /**
     * Cloudinary slug
     */
    cloudinary_id?: string,

    /**
     * The image's width in pixels
     */
    width?: number,

    /**
     * The image's height in pixels
     */
    height?: number

}