export interface ExternalReviewSourceEndpointResponse {

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
