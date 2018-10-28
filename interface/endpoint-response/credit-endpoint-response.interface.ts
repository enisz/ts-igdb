export interface CreditEndpointResponse {

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
	 * ID of a Game record (expandable)
	 */
	game?: number;

	/**
	 * See the Credit category value reference
	 */
	category?: number;

	/**
	 * ID of a Company record (expandable)
	 */
	company?: number;

	/**
	 * Position in the credits list.
	 */
	position?: number;

	/**
	 * ID of a Person record (expandable)
	 */
	person?: number;

	/**
	 * ID of a Character record (expandable)
	 */
	character?: number;

	/**
	 * ID of a Title record (expandable)
	 */
	person_title?: number;

	/**
	 * Please see the ISO-3316-1 reference
	 */
	country?: number;

	/**
	 * Credited name of the person only for overriding when misspelled or changed in credits.
	 */
	credited_name?: string;

	/**
	 * Credited name of the character only for overriding when misspelled or changed in credits.
	 */
	character_credited_name?: string;

}
