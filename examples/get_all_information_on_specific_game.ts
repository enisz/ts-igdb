/*

    Get all information from a specific game
    /games/1942?fields=*

    1942, is the ID of the game.

*/

import IGDB from '..';
import { IGDBOptions } from '../interface/igdb';
import { GameEndpointResponse } from '../interface/endpoint-response';

const igdb = new IGDB('<YOUR API KEY>');

const options: IGDBOptions = {
    id: [1942],
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