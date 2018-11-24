/*

    Search, return certain fields.
    /games/?search=Halo

    This will return search results and the IDs of the games. If you want to return certain fields of the game or even all, do the following:

    /games/?search=Halo&fields=name,publishers /games/?search=Halo&fields=*

*/

import IGDB from '..';
import { IGDBOptions } from '../interface/igdb';
import { GameEndpointResponse } from '../interface/endpoint-response';

const igdb = new IGDB('<YOUR API KEY>');

const options: IGDBOptions = {
    search: 'halo',
    fields: ['*']
};

igdb.endpoint.game(options)
.then(
    (response: GameEndpointResponse[]) => {
        console.log(response);
    }
)
.catch(
    (error: any) => console.log(error.message)
)