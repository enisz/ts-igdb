/*

    Coming soon games for Playstation 4
    /release_dates/?fields=*&filter[platform][eq]=48&order=date:asc&filter[date][gt]=1500619813000&expand=game

    1500619813000: Is the timestamp in milliseconds of today (This you need to generate yourself) 48 Is the platform id of Playstation 4.

*/

import IGDB from '..';
import { IGDBOptions } from '../interface/igdb';
import { ReleaseDateEndpointResponse } from '../interface/endpoint-response';

const igdb = new IGDB('<YOUR API KEY>');

const options: IGDBOptions = {
    fields: ['*'],
    filters: [
        {
            field: 'platform',
            postfix: 'eq',
            value: 48
        },
        {
            field: 'date',
            postfix: 'gt',
            value: new Date().getTime()
        }
    ],
    order: {
        field: 'date',
        direction: 'asc'
    },
    expand: ['game']
};

igdb.endpoint.release_date(options)
.then(
    (response: ReleaseDateEndpointResponse[]) => {
        console.log(response);
    }
)
.catch(
    (error: any) => console.log(error.message)
)