import { ReleaseDateEndpointResponse } from "./";
import { AlternativeName, Image, Video, ESRB, PEGI, Website } from "../miscellaneous";

export interface GameEndpointResponse {

	/**
	 * If count parameter is set in the options array, the value from IGDB will be stored here.
	 */
	count?: number

	id: string;

	name: string;

	slug: string;

	url: string;

	/**
	 * Unix epoch (milliseconds)
	 */
	created_at: number;

	/**
	 * Unix epoch (milliseconds)
	 */
	updated_at: number;

	summary?: string;

	storyline?: string;

	/**
	 * ID of a Collection record
	 */
	collection: number;

	/**
	 * ID of a Franchise record
	 */
	franchise?: number;

	/**
	 * Number of follows a game gets before release
	 */
	hypes?: number;

	/**
	 * A number based on traffic to that game page
	 */
	popularity?: number;

	/**
	 * Average user rating
	 */
	rating?: number;

	/**
	 * Number of user ratings
	 */
	rating_count?: number;

	/**
	 * Rating based on external critic scores
	 */
	aggregated_rating?: number;

	/**
	 * Number of external critic scores
	 */
	aggregated_rating_count?: number;

	/**
	 * Average rating based on both IGDB user and external critic scores
	 */
	total_rating?: number;

	/**
	 * Total number of user and external critic scores
	 */
	total_rating_count?: number;

	/**
	 * ID of a Game this game is a DLC/expansion of (expandable)
	 */
	game?: number;

	/**
	 * ID of a Game this game is an edition of
	 */
	version_parent?: number;

	/**
	 * IDs of Company records (expandable)
	 */
	developers?: number[];

	/**
	 * IDs of Company records (expandable)
	 */
	publishers?: number[];

	/**
	 * IDs of Game engine records
	 */
	game_engines?: number[];

	/**
	 * See the Game category value reference
	 */
	category?: number;

	/**
	 * See the Time to beat object reference
	 */
	time_to_beat?: object;

	/**
	 * IDs of Player perspective records
	 */
	player_perspectives?: number[];

	/**
	 * IDs of Game mode records
	 */
	game_modes?: number[];

	/**
	 * IDs of Keyword records
	 */
	keywords?: number[];

	/**
	 * IDs of Theme records
	 */
	themes?: number[];

	/**
	 * IDs of Genre records
	 */
	genres?: number[];

	/**
	 * IDs of Platform records
	 */
	platforms?: number[];

	/**
	 * Unix epoch (milliseconds)
	 */
	first_release_date?: number;

	/**
	 * See the Game status value reference
	 */
	status?: number;

	/**
	 * See the Release date object reference
	 */
	release_dates?: ReleaseDateEndpointResponse[];

	/**
	 * See the Alternative name object reference
	 */
	alternative_names?: AlternativeName[];

	/**
	 * See the Image object reference
	 */
	screenshots?: Image[];

	/**
	 * See the Video object reference
	 */
	videos?: Video[];

	/**
	 * See the Image object reference
	 */
	cover?: Image;

	/**
	 * See the ESRB object reference
	 */
	esrb?: ESRB;

	/**
	 * See the PEGI object reference
	 */
	pegi?: PEGI;

	/**
	 * See the Website object reference
	 */
	websites?: Website[];

	/**
	 * IDs of Game records (expandable)
	 */
	dlcs?: number[];

	/**
	 * IDs of Game records (expandable)
	 */
	expansions?: number[];

	/**
	 * IDs of Game records (expandable)
	 */
	standalone_expansions?: number[];

	/**
	 * IDs of Game records (expandable)
	 */
	bundles?: number[];

	/**
	 * IDs of Game records that are similar to this game. (expandable)
	 */
	games?: number[];

	/**
	 * See the External object reference
	 */
	external?: External;

	/**
	 * See the Image object reference
	 */
	artworks?: Image;

}
