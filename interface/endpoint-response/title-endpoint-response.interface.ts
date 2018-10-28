export interface TitleEndpointResponse {

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

	description?: string;

	/**
	 * IDs of Game records (expandable)
	 */
	games?: number[];

}
