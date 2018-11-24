/*

    Get versions (editions) of a game
    /game_versions/?fields=games,games.name&filter[game][eq]=28540&expand=games

    This resulting object will contain a list of version ids and names.

*/

import IGDB from '..';
import { IGDBOptions } from '../interface/igdb';
import { GameVersionEndpointResponse } from '../interface/endpoint-response';

const igdb = new IGDB('<YOUR API KEY>');

const options: IGDBOptions = {
    fields: ['games', 'games.name'],
    filters: [
        {
            field: 'game',
            postfix: 'eq',
            value: 28540
        }
    ],
    expand: ['games']
};

igdb.endpoint.game_version(options)
.then(
    (response: GameVersionEndpointResponse[]) => {
        console.log(response);
    }
)
.catch(
    (error: any) => console.log(error.message)
)