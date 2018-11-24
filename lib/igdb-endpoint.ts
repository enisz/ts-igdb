import { IGDBUrl } from './igdb-url';
import Got from 'got';

import { IGDBOptions, FilterOption } from '../interface/igdb';
import {
    AchievementsEndpointResponse,
    CharacterEndpointResponse,
    CollectionEndpointResponse,
    CompanyEndpointResponse,
    CreditEndpointResponse,
    ExternalReviewEndpointResponse,
    ExternalReviewSourceEndpointResponse,
    FeedEndpointResponse,
    FranchiseEndpointResponse,
    GameEndpointResponse,
    GameEngineEndpointResponse,
    GameModeEndpointResponse,
    GameVersionEndpointResponse,
    GenreEndpointResponse,
    KeywordEndpointResponse,
    UserProfileEndpointResponse,
    PageEndpointResponse,
    PersonEndpointResponse,
    PlatformEndpointResponse,
    PlayerPerspecitveEndpointResponse,
    PulseEndpointResponse,
    PulseGroupEndpointResponse,
    PulseSourceEndpointResponse,
    ReleaseDateEndpointResponse,
    ReviewEndpointResponse,
    ThemeEndpointResponse,
    TitleEndpointResponse
} from '../interface/endpoint-response';

export class IGDBEndpoint {

    /**
     * API key received from IGDB.
     */
    public API_KEY: string;

    /**
     * URL Helper class
     */
    private IGDBUrl: IGDBUrl = new IGDBUrl();

    /**
     * Setting up the endpoint instance
     * @param igdb_api_key API key received from IGDB
     */
    public constructor(igdb_api_key: string)
    {
        this.API_KEY = igdb_api_key;
    }

    /**
     * Sending the actual request
     * @param endpoint An IGDB endpoint to query
     * @param options An options object to customize the query
     */
    private request(endpoint: string, options: IGDBOptions): Promise<any>
    {
        const headers = {
            'user-key': this.API_KEY,
            'Accept': 'application/json'
        };

        return Got.get(this.IGDBUrl.queryUrl(endpoint, options), {headers : headers});
    }

    /**
     * Return the request as a promise.
     * @param endpoint The endpoint to get the data from
     * @param options An options object for the request
     */
    private asPromise(endpoint: string, options: IGDBOptions): Promise<any>
    {
        return new Promise(
            (resolve: Function, reject: Function) => {
                this.request(endpoint, options)
                .then(
                    (response: Got.Response<any>) => {
                        // If the request was successful resolve the body of the response as a JSON
                        resolve(JSON.parse(response.body))
                    }
                )
                .catch(
                    (error: Got.GotError) => {
                        // In case of any error, reject the error object
                        reject(error)
                    }
                )
            }
        );
    }

    /**
     * Fetch data using ACHIEVEMENTS endpoint
     * @param options An option object to customize the query
     * @link https://igdb.github.io/api/endpoints/achievements
     */
    public achievements(options: IGDBOptions): Promise<AchievementsEndpointResponse[]> { return this.asPromise('achievements', options); }

    /**
     * Fetch data using CHARACTER endpoint
     * @param options An option object to customize the query
     * @link https://igdb.github.io/api/endpoints/character
     */
    public character(options: IGDBOptions): Promise<CharacterEndpointResponse[]> { return this.asPromise('characters', options); }

    /**
     * Fetch data using COLLECTION endpoint
     * @param options An option object to customize the query
     * @link https://igdb.github.io/api/endpoints/collection
     */
    public collection(options: IGDBOptions): Promise<CollectionEndpointResponse[]> { return this.asPromise('collections', options); }

    /**
     * Fetch data using COMPANY endpoint
     * @param options An option object to customize the query
     * @link https://igdb.github.io/api/endpoints/company
     */
    public company(options: IGDBOptions): Promise<CompanyEndpointResponse[]> { return this.asPromise('companies', options); }

    /**
     * Fetch data using CREDITS endpoint
     * @param options An option object to customize the query
     * @link https://igdb.github.io/api/endpoints/credits
     */
    public credits(options: IGDBOptions): Promise<CreditEndpointResponse[]> { return this.asPromise('credits', options); }

    /**
     * Fetch data using ACHIEVEMENTS endpoint
     * @param options An option object to customize the query
     * @link https://igdb.github.io/api/endpoints/achievements
     */
    public feed(options: IGDBOptions): Promise<FeedEndpointResponse[]> { return this.asPromise('feeds', options); }

    /**
     * Fetch data using EXTERNAL REVIEW endpoint
     * @param options An option object to customize the query
     * @link https://igdb.github.io/api/endpoints/external-review
     */
    public external_review(options: IGDBOptions): Promise<ExternalReviewEndpointResponse[]> { return this.asPromise('external_reviews', options); }

    /**
     * Fetch data using EXTERNAL REVIEW SOURCE endpoint
     * @param options An option object to customize the query
     * @link https://igdb.github.io/api/endpoints/external-review-source
     */
    public external_review_source(options: IGDBOptions): Promise<ExternalReviewSourceEndpointResponse[]> { return this.asPromise('external_review_sources', options); }

    /**
     * Fetch data using FRANCHISE endpoint
     * @param options An option object to customize the query
     * @link https://igdb.github.io/api/endpoints/franchise
     */
    public franchise(options: IGDBOptions): Promise<FranchiseEndpointResponse[]> { return this.asPromise('franchises', options); }

    /**
     * Fetch data using GAME endpoint
     * @param options An option object to customize the query
     * @link https://igdb.github.io/api/endpoints/game
     */
    public game(options: IGDBOptions): Promise<GameEndpointResponse[]> { return this.asPromise('games', options); }

    /**
     * Fetch data using GAME ENGINE endpoint
     * @param options An option object to customize the query
     * @link https://igdb.github.io/api/endpoints/game-engine
     */
    public game_engine(options: IGDBOptions): Promise<GameEngineEndpointResponse[]> { return this.asPromise('game_engines', options); }

    /**
     * Fetch data using GAME MODE endpoint
     * @param options An option object to customize the query
     * @link https://igdb.github.io/api/endpoints/game-mode
     */
    public game_mode(options: IGDBOptions): Promise<GameModeEndpointResponse[]> { return this.asPromise('game_modes', options); }

    /**
     * Fetch data using GENRE endpoint
     * @param options An option object to customize the query
     * @link https://igdb.github.io/api/endpoints/genre
     */
    public genre(options: IGDBOptions): Promise<GenreEndpointResponse[]> { return this.asPromise('genres', options); }

    /**
     * Fetch data using KEYWORD endpoint
     * @param options An option object to customize the query
     * @link https://igdb.github.io/api/endpoints/keyword
     */
    public keyword(options: IGDBOptions): Promise<KeywordEndpointResponse[]> { return this.asPromise('keywords', options); }

    /**
     * Fetch data using PAGE endpoint
     * @param options An option object to customize the query
     * @link https://igdb.github.io/api/endpoints/page
     */
    public page(options: IGDBOptions): Promise<PageEndpointResponse[]> { return this.asPromise('pages', options); }

    /**
     * Fetch data using PERSON endpoint
     * @param options An option object to customize the query
     * @link https://igdb.github.io/api/endpoints/person
     */
    public person(options: IGDBOptions): Promise<PersonEndpointResponse[]> { return this.asPromise('persons', options); }

    /**
     * Fetch data using PLATFORM endpoint
     * @param options An option object to customize the query
     * @link https://igdb.github.io/api/endpoints/platform
     */
    public platform(options: IGDBOptions): Promise<PlatformEndpointResponse[]> { return this.asPromise('platforms', options); }

    /**
     * Fetch data using PLAYER PERSPECTIVE endpoint
     * @param options An option object to customize the query
     * @link https://igdb.github.io/api/endpoints/player-perspective
     */
    public player_perspective(options: IGDBOptions): Promise<PlayerPerspecitveEndpointResponse[]> { return this.asPromise('player_perspectives', options); }

    /**
     * Fetch data using PULSE endpoint
     * @param options An option object to customize the query
     * @link https://igdb.github.io/api/endpoints/pulse
     */
    public pulse(options: IGDBOptions): Promise<PulseEndpointResponse[]> { return this.asPromise('pulses', options); }

    /**
     * Fetch data using PULSE GROUP endpoint
     * @param options An option object to customize the query
     * @link https://igdb.github.io/api/endpoints/pulse-groups
     */
    public pulse_group(options: IGDBOptions): Promise<PulseGroupEndpointResponse[]> { return this.asPromise('pulse_groups', options); }

    /**
     * Fetch data using PULSE SOURCE endpoint
     * @param options An option object to customize the query
     * @link https://igdb.github.io/api/endpoints/pulse-source
     */
    public pulse_source(options: IGDBOptions): Promise<PulseSourceEndpointResponse[]> { return this.asPromise('pulse_sources', options); }

    /**
     * Fetch data using RELEASE DATE endpoint
     * @param options An option object to customize the query
     * @link https://igdb.github.io/api/endpoints/release-date 
     */
    public release_date(options: IGDBOptions): Promise<ReleaseDateEndpointResponse[]> { return this.asPromise('release_dates', options); }
    
    /**
     * Fetch data using REVIEW endpoint
     * @param options An option object to customize the query
     * @link https://igdb.github.io/api/endpoints/review
     */
    public review(options: IGDBOptions): Promise<ReviewEndpointResponse[]> { return this.asPromise('reviews', options); }

    /**
     * Fetch data using THEME endpoint
     * @param options An option object to customize the query
     * @link https://igdb.github.io/api/endpoints/theme
     */
    public theme(options: IGDBOptions): Promise<ThemeEndpointResponse[]> { return this.asPromise('themes', options); }

    /**
     * Fetch data using TITLE endpoint
     * @param options An option object to customize the query
     * @link https://igdb.github.io/api/endpoints/title 
     */
    public title(options: IGDBOptions): Promise<TitleEndpointResponse[]> { return this.asPromise('titles', options); }

    /**
     * Fetch data using USER PROFILE endpoint
     * @param options An option object to customize the query
     * @link https://igdb.github.io/api/endpoints/me
     */
    public user_profile(options: IGDBOptions): Promise<UserProfileEndpointResponse[]> { return this.asPromise('me', options); }

    /**
     * Fetch data using VERSIONS endpoint
     * @param options An option object to customize the query
     * @link https://igdb.github.io/api/endpoints/version
     */
    public game_version(options: IGDBOptions): Promise<GameVersionEndpointResponse[]> { return this.asPromise('game_versions', options); }
}