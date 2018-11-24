/*

    Search games but exclude versions (editions)
    /games/?search=Assassins%20Creed&fields=name&filter[version_parent][not_exists]=1

    This will return search results with ID and name of the game but exclude editions such as “Collectors Edition”.

*/

import IGDB from '..';
import { IGDBOptions } from '../interface/igdb';
import { GameEndpointResponse } from '../interface/endpoint-response';

const igdb = new IGDB('<YOUR API KEY>');

const options: IGDBOptions = {
    search: 'Assassins Creed',
    fields: ['name'],
    filters: [
        {
            field: 'version_parent',
            postfix: 'not_exists',
            value: 1
        }
    ]
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