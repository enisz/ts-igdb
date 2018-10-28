import { Image, PlatformVersion } from "../miscellaneous";

export interface PlatformEndpointResponse {

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

	website?: string;

	summary?: string;

	alternative_name?: string;

	generation?: number;

	/**
	 * IDs of Game records
	 */
	games?: number[];

	/**
	 * See the Platform version object reference
	 */
	versions?: PlatformVersion[];

	shortcut?: any;

	category?: any;

	product_family?: any;

}
