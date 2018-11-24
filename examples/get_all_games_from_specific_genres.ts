/*

    Get all games from specific genres
    /genres/12,9,11?fields=*

    Notice you can comma separate multiple IDs (12, 9 and 11). You can do this with games, companies and anything else.

*/

import IGDB from '..';
import { IGDBOptions } from '../interface/igdb';
import { GenreEndpointResponse } from '../interface/endpoint-response';

const igdb = new IGDB('<YOUR API KEY>');

const options: IGDBOptions = {
    id: [12, 9, 11],
    fields: ['*']
};

igdb.endpoint.genre(options)
.then(
    (response: GenreEndpointResponse[]) => {
        console.log(response);
    }
)
.catch(
    (error: any) => console.log(error.message)
)