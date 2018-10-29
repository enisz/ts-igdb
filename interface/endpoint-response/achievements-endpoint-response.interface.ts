import { Image } from '../miscellaneous';

export interface AchievementsEndpointResponse {

	id: number;

	name: string;

	/**
	 * ID of an Achievement Source (steam, playstation etc)
	 */
	category: number;

	/**
	 * See the Image object reference
	 */
	icon?: Image;

	/**
	 * See the Image object reference
	 */
	locked_icon?: Image;

	/**
	 * IDs of Game records
	 */
	game?: number[];

	/**
	 * Description of the achievement. Usually how to obtain it.
	 */
	description?: string;

	/**
	 * The ID given to the achievement by the external service
	 */
	external_id: string;

	/**
	 * Number of people who own that achievement
	 */
	owners?: number;

	/**
	 * Percent of people who own the game and own the achievement
	 */
	owners_percentage?: number;

	/**
	 * Relevant words and terms associated with this achievement
	 */
	tags?: string[];

	/**
	 * Unix epoch
	 */
	created_at: number;

	/**
	 * Unix epoch
	 */
	updated_at: number;

}
