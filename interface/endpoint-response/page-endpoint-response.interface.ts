import { Image } from "../miscellaneous";

export interface PageEndpointResponse {

	id: number;

	slug: string;

	url: string;

	/**
	 * Unix epoch
	 */
	created_at: number;

	/**
	 * Unix epoch
	 */
	updated_at: number;

	name: string;

	content?: string;

	category?: number;

	sub_category?: number;

	/**
	 * Please see the ISO-3316-1 reference
	 */
	country?: number;

	color?: number;

	user?: number;

	/**
	 * IDs of Game records
	 */
	game?: number;

	/**
	 * IDs of Company records
	 */
	company?: number;

	description?: string;

	page_follows_count?: number;

	/**
	 * See the Image object reference
	 */
	logo?: Image[];

	/**
	 * See the Image object reference
	 */
	background?: Image[];

	facebook?: string;

	twitter?: string;

	twitch?: string;

	instagram?: string;

	youtube?: string;

	steam?: string;

	linkedin?: string;

	pinterest?: string;

	soundcloud?: string;

	google_plus?: string;

	reddit?: string;

	battlenet?: string;

	origin?: string;

	uplay?: string;

	discord?: string;

}
