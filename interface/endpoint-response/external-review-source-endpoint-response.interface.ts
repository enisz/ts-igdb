export interface ExternalReviewSourceEndpointResponse {

	/**
	 * If count parameter is set in the options array, the value from IGDB will be stored here.
	 */
	count?: number
	
	id: number;

	/**
	 * ID of a Game record
	 */
	game: number;

	url: string;

	/**
	 * The review score out of 100
	 */
	score?: number;

}
