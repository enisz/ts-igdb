import { IGDBOptions, FilterOption, OrderOption } from '../interface/igdb';
import { Image } from '../interface/miscellaneous';

export class IGDBUrl {

    protected API_URL: string = 'https://api-endpoint.igdb.com';

    public constructor()
    {
    }

    /**
     * Get the query url for the provided options
     * @param options An options object
     */
    public queryString(options: IGDBOptions): string
    {

        // An array for the params to concatenate with & signs
        let params: string[] = [];

        // A string to append the url segments to. This will be returned.
        let url: string = '';

        // If id and search parameters are present at the same time => remove the search parameter
        if(options.id && options.search)
            delete options.search;

        // If there is a count and id parameters simultaneously, remove the id parameter
        if(options.count && options.count == true && options.id)
            delete options.id;

        for(let param in options)
        {
            // If count parameter is set and the actual parameter is not a filter, then skip this round
            if(options.count && options.count === true && param != 'filters')
                continue;

            switch(param)
            {   
                case 'search':
                    params.push(`${param}=${encodeURI(<string>options[param])}`);
                break;

                case 'expand':
                case 'fields':
                    params.push(`${param}=${(<string[]>options[param]).join(',')}`);
                break;
                
                case 'limit':
                case 'offset':
                    params.push(`${param}=${(<number>options[param])}`);
                break;
                
                case 'filters':
                    (<FilterOption[]>options[param]).forEach( filter => {
                        let filterValue: string;

                        if(typeof filter.value == 'string' || typeof filter.value == 'number')
                            filterValue = filter.value.toString();
                            
                        else
                            filterValue = filter.value.join(',');
                        
                        params.push(`filter[${filter.field}][${filter.postfix}]=${filterValue}`);
                    });
                break;
                
                case 'order':
                    const field: string = (<OrderOption>options[param]).field;
                    const direction: string = (<OrderOption>options[param]).direction;
                    const subfilter: string | undefined = (<OrderOption>options[param]).subfilter;

                    params.push(`${param}=${field}:${direction}${subfilter != undefined ? `:${subfilter}` : ``}`);
                break;
            }
        }

        // If there are ID's in the options array, join them with commas
        if(options.id && options.id.length > 0)
            url += options.id.join(',');

        // If count parameter is set, append it to the url.
        if(options.count && options.count === true)
            url += 'count';
        
        url += '?';

        // Join all parameters with & sign
        url += params.join('&');

        return url;
    }

    /**
     * Get the IGDB API URL
     */
    public apiUrl(): string
    {
        return this.API_URL;
    }

    /**
     * Get the full query url for provided options
     * @param endpoint The IGDB endpoint
     * @param options An options object
     */
    public queryUrl(endpoint: string, options: IGDBOptions): string {
        return `${this.apiUrl()}/${endpoint}/${this.queryString(options)}`;
    }

    /**
     * Helper method to get direct url to images.
     * @param image An image object from the game result
     * @param size The size of the image. Refer to the IGDB documentation for details.
     * @link https://igdb.github.io/api/references/images
     */
    public image(image: Image, size: string): string
    {
        const baseUrl: string = 'https://images.igdb.com/igdb/image/upload';
        const sizes: string[] = [
            'cover_small', 'cover_small_2x',
            'screenshot_med', 'screenshot_med_2x',
            'cover_big', 'cover_big_2x',
            'logo_med', 'logo_med_2x',
            'screenshot_big', 'screenshot_big_2x',
            'screenshot_huge', 'screenshot_huge_2x',
            'thumb', 'thumb_2x',
            'micro', 'micro_2x',
            '720p', '720p_2x',
            '1080p', '1080p_2x'
        ];

        if(image.cloudinary_id)
        {
            if(sizes.indexOf(size) != -1)
                return `${baseUrl}/${image.cloudinary_id}/${size}.png`;
            else
                return `${baseUrl}/thumb.png`;
        }

        else
            return image.url;
    }

}