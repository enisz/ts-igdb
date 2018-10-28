/**
 * OrderOption interface
 */
export interface OrderOption {

    /**
     * The field you want to do the ordering by
     */
    field: string,

    /**
     * The direction of the ordering.
     */
    direction: "asc" | "desc",

    /**
     * You can apply this optional subfilter for even more complex ordering.
     */
    subfilter?: "min" | "max" | "avg" | "sum" | "median"
}