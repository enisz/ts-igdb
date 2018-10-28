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
        let params: string[] = [];
        let url: string = '';
        let ids: number[] = [];

        if(options.id && options.search)
            delete options.search;

        for(let param in options)
            switch(param)
            {
                case 'id':
                    ids = (<number[]>options[param]);
                break;
                
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
                        params.push(`filter[${filter.field}][${filter.postfix}]=${filter.value}`);
                    });
                break;
                
                case 'order':
                    const field: string = (<OrderOption>options[param]).field;
                    const direction: string = (<OrderOption>options[param]).direction;
                    const subfilter: string | undefined = (<OrderOption>options[param]).subfilter;

                    params.push(`${param}=${field}:${direction}${subfilter != undefined ? `:${subfilter}` : ``}`);
                break;
            }

        if(ids.length != 0)
            url += ids.join(',');
        
        url += '?';

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