import { Image } from "../miscellaneous";

export interface CharacterEndpointResponse {

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
	 * See the Gender value reference
	 */
	gender?: number;

	/**
	 * Name aliases - ‘also known as’
	 */
	akas?: string[];

	/**
	 * See the Species value reference
	 */
	species?: number;

	/**
	 * IDs of Game records
	 */
	games?: number[];

	/**
	 * IDs of Person records
	 */
	people?: number[];

	country_name?: any;

}
