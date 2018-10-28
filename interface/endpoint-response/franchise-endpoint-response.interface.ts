export interface FranchiseEndpointResponse {

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
	 * IDs of Game records
	 */
	games?: number[];

}
