import { Image } from "../miscellaneous";

export interface CompanyEndpointResponse {

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
	logo?: Image;

	description?: string;

	/**
	 * Please see the ISO-3316-1 reference
	 */
	country?: number;

	website?: string;

	/**
	 * Unix epoch
	 */
	start_date?: number;

	/**
	 * See the Date category value reference
	 */
	start_date_category?: number;

	/**
	 * ID of a Company record
	 */
	changed_company_id?: number;

	/**
	 * Unix epoch
	 */
	change_date?: number;

	/**
	 * See the Date category value reference
	 */
	change_date_category?: number;

	/**
	 * The URL of the Twitter profile
	 */
	twitter?: string;

	/**
	 * IDs of Game records
	 */
	published?: number[];

	/**
	 * IDs of Game records
	 */
	developed?: number[];

	parent?: any;

	facebook?: any;

}
