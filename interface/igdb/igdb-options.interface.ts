import { FilterOption } from './filter-option.interface';
import { OrderOption } from './order-option.interface';

/**
 * IGDBOptions interface
 */
export interface IGDBOptions {
    /**
     * One ore more game ID's. When ID is provided, the search parameter will be ignored.
     */
    id? : number[],

    /**
     * The query will search the name field looking for this value. If id is provided in the same options object, than this value will be ignored.
     */
    search? : string,

    /**
     * The fields you want to see in the result array.
     */
    fields? : string[],

    /**
     * The maximum number of results in a single query. This value must be a number between 1 and 50.
     */
    limit? : number,

    /**
     * This will start the result list at the provided value and will give limit number of results. This value must be 0 or greater.
     */
    offset? : number,

    /**
     * The expander feature is used to combine multiple requests.
     */
    expand? : string[],

    /**
     * Filters are used to swift through results to get what you want. You can exclude and include results based on their properties.
     */
    filters? : FilterOption[],

    /**
     * Ordering (sorting) is used to order results by a specific field. When not provided, the results will be ordered ASCENDING by ID.
     */
    order? : OrderOption,
}