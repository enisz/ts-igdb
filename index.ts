import { IGDBEndpoint } from './lib/igdb-endpoint';
import { IGDBUrl } from './lib/igdb-url';

export default class IGDB {
    /**
     * API KEY recevied from IGDB
     */
    protected API_KEY: string;

    /**
     * Endpoint methods
     */
    public endpoint: IGDBEndpoint;

    /**
     * URL helper class
     */
    public url: IGDBUrl;

    /**
     * Setting up the instance
     * @param API_KEY API authentication key recevied from IGDB
     */
    public constructor(API_KEY: string) {
        this.API_KEY = API_KEY;
        this.endpoint = new IGDBEndpoint(API_KEY);
        this.url = new IGDBUrl();
    }
}