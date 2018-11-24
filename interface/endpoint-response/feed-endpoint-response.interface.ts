export interface FeedEndpointResponse {

	/**
	 * If count parameter is set in the options array, the value from IGDB will be stored here.
	 */
	count?: number
	
	id: number;

	url: string;

	/**
	 * Unix epoch
	 */
	created_at: number;

	/**
	 * Unix epoch
	 */
	updated_at: number;

	content?: string;

	/**
	 * ID of a User record
	 */
	user?: number;

	/**
	 * ID of a Game record
	 */
	games?: any;

	title?: string;

	feed_likes_count?: number;

}
