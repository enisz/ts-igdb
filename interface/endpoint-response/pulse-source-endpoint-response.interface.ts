export interface PulseSourceEndpointResponse {

	/**
	 * If count parameter is set in the options array, the value from IGDB will be stored here.
	 */
	count?: number
	
	id: number;

	/**
	 * Name of pulse source
	 */
	name: string;

	/**
	 * ID of a Game record if this pulse source has a game connected to it
	 */
	game: number;

	/**
	 * ID of a Page record if this pulse source has a page connected to it
	 */
	page: number;

}
