export interface ReviewEndpointResponse {

	id: number;

	username: string;

	slug: string;

	url: string;

	title: string;

	/**
	 * Unix epoch
	 */
	created_at: number;

	/**
	 * Unix epoch
	 */
	updated_at: number;

	/**
	 * ID of a Game record
	 */
	game: number;

	/**
	 * ?
	 */
	category: number;

	likes: number;

	views: number;

	/**
	 * ?
	 */
	rating_category: number;

	/**
	 * ID of a Platform record
	 */
	platform?: number;

	/**
	 * Youtube video slug
	 */
	video?: string;

	introduction?: string;

	content?: string;

	conclusion?: string;

	positive_points?: string;

	negative_points?: string;

}
