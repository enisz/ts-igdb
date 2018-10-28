export interface ReleaseDateEndpointResponse {

	id: number;

	/**
	 * ID of a Game record
	 */
	game: number;

	/**
	 * See the Date category value reference
	 */
	category: number;

	/**
	 * ID of a Platform record
	 */
	platform: number;

	/**
	 * The release date in human readable format.
	 */
	human: string;

	/**
	 * When the release_date was updated.
	 */
	updated_at: number;

	/**
	 * When the release_date was created.
	 */
	created_at: number;

	/**
	 * Unix epoch in milliseconds.
	 */
	date?: number;

	/**
	 * The year in 4-digit format
	 */
	y?: number;

	/**
	 * The month in no-leading-zero format (1-12)
	 */
	m?: number;

	region?: any;

}
