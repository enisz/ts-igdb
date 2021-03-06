export interface PulseEndpointResponse {

	/**
	 * If count parameter is set in the options array, the value from IGDB will be stored here.
	 */
	count?: number
	
	id: number;

	title: string;

	/**
	 * Can contain HTML markup
	 */
	summary: string;

	/**
	 * Publisher’s pulse URL, can be path only.
	 */
	url: string;

	/**
	 * Publisher’s pulse entry unique id
	 */
	uid: string;

	/**
	 * Unix epoch
	 */
	created_at: number;

	/**
	 * Unix epoch
	 */
	updated_at: number;

	/**
	 * Unix epoch
	 */
	published_at: number;

	/**
	 * URL pointing to the image
	 */
	image?: string;

	author?: string;

	/**
	 * An array of Tag Numbers
	 */
	tags?: number
}
