/**
 * FilterOption interface
 */
export interface FilterOption {
    /**
     * The name of the field you want to apply the filter to
     */
    field: string,

    /**
     * The postfix you want to use with the filter.
     */
    postfix: "eq" | "not_eq" | "gt" | "gte" | "lt" | "lte" | "prefix" | "exists" | "not_exists" | "in" | "not_in" | "any",

    /**
     * The value of the filter.
     */
    value: number
}