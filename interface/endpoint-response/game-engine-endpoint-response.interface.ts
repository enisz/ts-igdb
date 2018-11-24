import { Image } from "../miscellaneous";

export interface GameEngineEndpointResponse {

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

	/**
	 * IDs of Game records
	 */
	games?: number[];

	/**
	 * IDs of Company records
	 */
	companies?: number[];

	/**
	 * IDs of Platforms records
	 */
	platforms?: number[];

}
