/*

    Order by popularity
    Popularity parameter for games. You can access it like this: /games/?fields=name,popularity&order=popularity:desc

    The popularity number is calculated using usage statistics of game pages at https://www.igdb.com

*/

import IGDB from '..';
import { IGDBOptions } from '../interface/igdb';
import { GameEndpointResponse } from '../interface/endpoint-response';

const igdb = new IGDB('<YOUR API KEY>');

const options: IGDBOptions = {
    fields: ['name', 'popularity'],
    order: {
        field: 'popularity',
        direction: 'desc'
    }
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