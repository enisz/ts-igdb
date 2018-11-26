/*

    Count total games from a certain platform (Playstation 4 , id=48)
    /games/count?filter[release_dates.platform][eq]=48

*/

import IGDB from '..';
import { IGDBOptions } from '../interface/igdb';
import { GameEndpointResponse } from '../interface/endpoint-response';

const igdb = new IGDB('<YOUR API KEY>');

const options: IGDBOptions = {
    count: true,
    filters: [
        {
            field: 'release_dates.platform',
            postfix: 'eq',
            value: 48
        }
    ]
};

igdb.endpoint.game(options)
.then(
    (response: GameEndpointResponse[]) => {
        // When using count, the response will be an array with one element with only one property: count
        console.log(response[0].count);
    }
)
.catch(
    (error: any) => console.log(error.message)
)