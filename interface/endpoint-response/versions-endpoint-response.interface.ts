export interface GameVersionEndpointResponse {

	id: number;

	/**
	 * ID of the parent game
	 */
	game: number;

	/**
	 * Unix epoch
	 */
	created_at: number;

	/**
	 * Unix epoch
	 */
	updated_at: number;

	/**
	 * IDs of Game records which are versions of the main game
	 */
	games?: number[];

	/**
	 * URL of the main game
	 */
	url: string;

	/**
	 * Array of Features (see below)
	 */
	features?: Feature[];

	/**
	 * Feature’s value
	 */
	value: string;

}

export interface Feature {

	/**
	 * Title of the feature
	 */
	title: string;

	/**
	 * Description of the feature
	 */
	description: string;

	/**
	 * Feature category (see below)
	 */
	category: number;

	/**
	 * Show at this index
	 */
	position: number;

	/**
	 * Array of Feature values (see below)
	 */
	values: FeatureValue[];
}

export interface FeatureValue {
	/**
	 * ID of the Edition
	 */
	game: number;

	/**
	 * Feature's value
	 */
	value: string;
}