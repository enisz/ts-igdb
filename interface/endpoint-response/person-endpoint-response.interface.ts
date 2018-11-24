import { Image } from "../miscellaneous";

export interface PersonEndpointResponse {

	/**
	 * If count parameter is set in the options array, the value from IGDB will be stored here.
	 */
	count?: number
	
	id: number;

	name: string;

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

	/**
	 * See the Image object reference
	 */
	mug_shot?: Image;

	/**
	 * IDs of Game records
	 */
	games?: number[];

	/**
	 * IDs of Character records
	 */
	characters?: number[];

	/**
	 * IDs of Game records
	 */
	voice_acted?: number[];

	bio?: any;

	country?: any;

	description?: any;

	dob?: any;

	parent?: any;

	homepage?: any;

	twitter?: any;

	linkedin?: any;

	google_plus?: any;

	facebook?: any;

	instagram?: any;

	tumblr?: any;

	soundcloud?: any;

	pinterest?: any;

	youtube?: any;

	nicknames?: any;

	loves_count?: any;

}
