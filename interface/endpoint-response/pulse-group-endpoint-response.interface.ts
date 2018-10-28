export interface PulseGroupEndpointResponse {

	id: number;

	name: string;

	/**
	 * Unused (for now)
	 */
	category: number;

	/**
	 * Unix epoch
	 */
	created_at: number;

	/**
	 * Unix epoch
	 */
	updated_at: number;

	/**
	 * Unix epoch
	 */
	published_at: number;

	/**
	 * An array of Tag Numbers
	 */
	tags: number[];
	
	/**
	 * ID of a Pulse item
	 */
	pulses?: number[];

}
