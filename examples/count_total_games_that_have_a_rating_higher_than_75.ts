/*

    Count total games that have a rating higher than 75
    /games/count?filter[rating][gt]=75

*/

import IGDB from '..';
import { IGDBOptions } from '../interface/igdb';
import { GameEndpointResponse } from '../interface/endpoint-response';

const igdb = new IGDB('<YOUR API KEY>');

const options: IGDBOptions = {
    count: true,
    filters: [
        {
            field: 'rating',
            postfix: 'gt',
            value: 75
        }
    ]
};

igdb.endpoint.game(options)
.then(
    (response: GameEndpointResponse[]) => {
        // The response will be an array with only one elemnet with only a count property
        console.log(response[0].count);
    }
)
.catch(
    (error: any) => console.log(error.message)
)