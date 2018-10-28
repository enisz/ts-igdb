export interface UserProfileEndpointResponse {

	id: number;

	username: string;

	slug: string;

	/**
	 * Unix epoch
	 */
	updated_at: number;

	/**
	 * Unix epoch
	 */
	created_at: number;

	/**
	 * type of user
	 */
	role: number;

	/**
	 * profile color
	 */
	color: number;

	/**
	 * User cover image
	 */
	avatar: object;

	/**
	 * User background image
	 */
	background: object;

}
