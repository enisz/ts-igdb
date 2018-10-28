# Node.js wrapper for IGDB API

<!-- toc -->

- [Introduction](#introduction)
- [Installation](#installation)
- [Basic usage](#basic-usage)
- [Options](#options)
- [Methods](#methods)
  * [IGDB endpoint](#igdb-endpoint)
    + [achievements](#achievements)
    + [character](#character)
    + [collection](#collection)
    + [company](#company)
    + [credits](#credits)
    + [feed](#feed)
    + [external_review](#external_review)
    + [external_review_source](#external_review_source)
    + [franchise](#franchise)
    + [game](#game)
    + [game_engine](#game_engine)
    + [game_mode](#game_mode)
    + [genre](#genre)
    + [keyword](#keyword)
    + [page](#page)
    + [person](#person)
    + [platform](#platform)
    + [player_perspective](#player_perspective)
    + [pulse](#pulse)
    + [pulse_group](#pulse_group)
    + [pulse_source](#pulse_source)
    + [release_date](#release_date)
    + [review](#review)
    + [theme](#theme)
    + [title](#title)
    + [user_profile](#user_profile)
    + [versions](#versions)
  * [IGDB url](#igdb-url)
    + [Query String](#query-string)
    + [Api URL](#api-url)
    + [Query URL](#query-url)
    + [Image](#image)
- [Interfaces](#interfaces)
  * [IGDB interfaces](#igdb-interfaces)
  * [Endpoint Responses](#endpoint-responses)
  * [Miscellaneous Objects](#miscellaneous-objects)

<!-- tocstop -->

## Introduction
This module is written in TypeScript with the type declaration files included. Provides an easy-to-use interface to request information from the IGDB API. To use this API you will need to register at [https://api.igdb.com/](https://api.igdb.com/).

## Installation
The module can be easily installed via node package manager
```
npm install ts-igdb --save
```

The package includes the type declaration files for TypeScript; you don't need to install them separately.

## Basic usage

```
// index.js
const IGDB = require('ts-igdb').default;

const igdb = new IGDB('<YOUR API KEY>');

// Fetch data using the GAME endpoint
igdb.endpoint.game({
    search : 'uncharted 4',             // searching for a game
    fields: ['id', 'name', 'cover'],    // return these fields
    limit: 5,                           // set the maximum number of results
    order: {                            // set the ordering
        field: 'name',                  // by the name field
        direction: 'asc'                // in ascending order
    }
})
.then(
    games => {
        // games will contain all results as an array
        console.log(games);
    }
).catch(
    error => {
        // in case of an error, the error object will be returned
        console.log(error.message);
    }
)
```

```
// index.ts
import Got from 'got'
import IGDB from 'ts-igdb';
import { IGDBOptions } from 'ts-igdb/interface/igdb';
import { GameEndpointResponse } from 'ts-igdb/interface/endpoint-response';

const igdb = new IGDB('<YOUR API KEY>');

const options: IGDBOptions = {
    search : 'uncharted 4',             // searching for a game
    fields: ['id', 'name', 'cover'],    // return these fields
    limit: 5,                           // set the maximum number of results
    order: {                            // set the ordering
        field: 'name',                  // by the name field
        direction: 'asc'                // in ascending order
    }
}

igdb.endpoint.game(options)
.then(
    (games: GameEndpointResponse[]) => {
        // games will contain all results as an array
        console.log(games);
    }
)
.catch(
    (error: Got.GotError) => {
        // in case of an error, the Got module's error object will be returned
        console.log(error.message);
    }
)
```

## Options
Every endpoint method will expect an ``options`` object which will set the request's parameters. The object can contain the following keys:
 - ``id [optional]``: One ore more ID's as an array. When ID is provided, the search parameter will be ignored. 
 - ``search [optional]``: The query will search the name field looking for this value as a string. If id is provided in the same options object, than this value will be ignored.
 - ``fields [optional]``: The fields you want to see in the result array. If every field is required an array with a single star element can be set ( `` search: ['*'] `` )
 - ``limit [optional]``: The maximum number of results in a single query. This value must be a number between 1 and 50.
 - ``offset``: This will start the result list at the provided value and will give limit number of results. This value must be a number (0 or greater).
 - ``expand [optional]``: The expander feature is used to combine multiple requests. Have to be provided as an array of strings.
 - ``filters [optional]``: Filters are used to swift through results to get what you want. You can exclude and include results based on their properties. The parameter have to be provided as an array. The elements have to contain an object with the following parameters (these are not optional, all three parameters are required):
   - ``field``: The name of the field you want to apply the filter to
   - ``postfix``: The postfix you want to use with the filter. The values can be
     - ``eq``: Equal: Exact match equal.
     - ``not_eq``: Not Equal: Exact match equal.
     - ``gt``: Greater than works only on numbers.
     - ``gte``: Greater than or equal to works only on numbers.
     - ``lt``: Less than works only on numbers.
     - ``lte``: Less than or equal to works only on numbers.
     - ``prefix``: Prefix of a value only works on strings.
     - ``exists``: The value is not null.
     - ``not_exists``: The value is null.
     - ``in``: The value exists within the (comma separated) array (AND between values).
     - ``not_in``: The values must not exists within the (comma separated) array (AND between values).
     - ``any``: The value has any within the (comma separated) array (OR between values).
   - ``value``: The value of the filter as a number
 - ``order [optional]``: Ordering (sorting) is used to order results by a specific field. When not provided, the results will be ordered ASCENDING by ID. This have to be an object with the following parameters:
      - ``field``: The field you want to do the ordering by as a string
      - ``direction``: The direction of the ordering. This can have one of the following values:
        - ``asc``: ascending ordering
        - ``desc``: descending ordering
      - ``subfilter [optional]``: The field you want to do the ordering by as a string. This parameter can have the following values:
        - ``min``
        - ``max``
        - ``avg``
        - ``sum``
        - ``median``


## Methods
### IGDB endpoint
Data can be requested from most of the IGDB endpoints. For more information on the returned data can be found in the [IGDB Endpoint documentation](https://igdb.github.io/api/endpoints)

Every endpoint method expects an ``options`` object to set up the request and returns a ``Promise``. In case of a successful request the ``Promise`` will resolve the results as an array. If the request failed it will reject the [Got module](https://www.npmjs.com/package/got)'s error object.

#### achievements
```IGDB.endpoint.achievements(options: IGDBOptions): Promise<AchievementEndpointResponse[]>```

#### character
```IGDB.endpoint.character(options: IGDBOptions): Promise<CharacterEndpointResponse[]>```

#### collection
```IGDB.endpoint.collection(options: IGDBOptions): Promise<CollectionEndpointResponse[]>```

#### company
```IGDB.endpoint.company(options: IGDBOptions): Promise<CompanyEndpointResponse[]>```

#### credits
```IGDB.endpoint.credits(options: IGDBOptions): Promise<CreditEndpointResponse[]>```

#### feed
```IGDB.endpoint.feed(options: IGDBOptions): Promise<FeedEndpointResponse[]>```

#### external_review
```IGDB.endpoint.external_review(options: IGDBOptions): Promise<ExternalReviewEndpointResponse[]>```

#### external_review_source
```IGDB.endpoint.external_review_source(options: IGDBOptions): Promise<ExternalReviewSourceEndpointResponse[]>```

#### franchise
```IGDB.endpoint.franchise(options: IGDBOptions): Promise<FranchiseEndpointResponse[]>```

#### game
```IGDB.endpoint.game(options: IGDBOptions): Promise<GameEndpointResponse[]>```

#### game_engine
```IGDB.endpoint.game_engine(options: IGDBOptions): Promise<GameEngineEndpointResponse[]>```

#### game_mode
```IGDB.endpoint.game_mode(options: IGDBOptions): Promise<GameModeEndpointResponse[]>```

#### genre
```IGDB.endpoint.genre(options: IGDBOptions): Promise<GenreEndpointResponse[]>```

#### keyword
```IGDB.endpoint.keyword(options: IGDBOptions): Promise<KeywordEndpointResponse[]>```

#### page
```IGDB.endpoint.page(options: IGDBOptions): Promise<PageEndpointResponse[]>```

#### person
```IGDB.endpoint.person(options: IGDBOptions): Promise<PersonEndpointResponse[]>```

#### platform
```IGDB.endpoint.platform(options: IGDBOptions): Promise<PlatformEndpointResponse[]>```

#### player_perspective
```IGDB.endpoint.player_perspective(options: IGDBOptions): Promise<PlayerPerspecitveEndpointResponse[]>```

#### pulse
```IGDB.endpoint.pulse(options: IGDBOptions): Promise<PulseEndpointResponse[]>```

#### pulse_group
```IGDB.endpoint.pulse_group(options: IGDBOptions): Promise<PulseGroupEndpointResponse[]>```

#### pulse_source
```IGDB.endpoint.pulse_source(options: IGDBOptions): Promise<PulseSourceEndpointResponse[]>```

#### release_date
```IGDB.endpoint.release_date(options: IGDBOptions): Promise<ReleaseDateEndpointResponse[]>```

#### review
```IGDB.endpoint.review(options: IGDBOptions): Promise<ReviewEndpointResponse[]>```

#### theme
```IGDB.endpoint.theme(options: IGDBOptions): Promise<ThemeEndpointResponse[]>```

#### title
```IGDB.endpoint.title(options: IGDBOptions): Promise<TitleEndpointResponse[]>```

#### user_profile
```IGDB.endpoint.user_profile(options: IGDBOptions): Promise<UserProfileEndpointResponse[]>```

#### versions
```IGDB.endpoint.versions(options: IGDBOptions): Promise<GameVersionEndpointResponse[]>```

### IGDB url
This is an URL helper method. Full or partial URL's can be retrieved.
#### Query String
```
IGDB.url.queryString(options: IGDBOptions): string
```
This method expects an ``options`` object and returns the parsed query string with the parameters in it as a string.
````
const options = {
    search : 'uncharted 4',             // searching for a game
    fields: ['id', 'name', 'cover'],    // return these fields
    limit: 5,                           // set the maximum number of results
    order: {                            // set the ordering
        field: 'name',                  // by the name field
        direction: 'asc'                // in ascending order
    }
};

const queryString = igdb.url.queryString(options);

console.log(queryString);
````
Output:
```
?search=uncharted%204&fields=id,name,cover&limit=5&order=name:asc
```

#### Api URL
```
IGDB.url.apiUrl(): string
```
This method will return the IGDB API's URL
```
const url = igdb.url.apiUrl();
console.log(url);
```
Output:
```
https://api-endpoint.igdb.com
```

#### Query URL
```
IGDB.url.queryUrL(endpoint: string, options: IGDBOptions): string
```
This method will return the full query url. Expects two parameters:
 - ``endpoint``: The endpoint to send the request to
 - ``options``: An options object

Returns a string with the full url
```
const options = {
    search : 'uncharted 4',             // searching for a game
    fields: ['id', 'name', 'cover'],    // return these fields
    limit: 5,                           // set the maximum number of results
    order: {                            // set the ordering
        field: 'name',                  // by the name field
        direction: 'asc'                // in ascending order
    }
};

const queryUrl = igdb.url.queryUrl('game', options);

console.log(queryUrl);
```
Output:
```
https://api-endpoint.igdb.com/game/?search=uncharted%204&fields=id,name,cover&limit=5&order=name:asc
```

#### Image
```
IGDB.url.image(image: Image, size: string): string
```
The method helps convert the Image objects from the results to an URL to the image. Expects two parameters:
 - ``image``: an image object from the results
 - ``size``: The image size. These values can be the following:
   - ``cover_small``: Fit (90 x 128)
   - ``cover_small_2x``: Fit (retina DPR 2.0 size)
   - ``screenshot_med``: Lfill, Center gravity (569 x 320)
   - ``screenshot_med_2x``: Lfill, Center gravity (retina DPR 2.0 size)
   - ``cover_big``: Fit (264 x 374)
   - ``cover_big_2x``: Fit (retina DPR 2.0 size)
   - ``logo_med``: Fit (284 x 160)
   - ``logo_med_2x``: Fit (retina DPR 2.0 size)
   - ``screenshot_big``: Lfill, Center gravity (889 x 500)
   - ``screenshot_big_2x``: Lfill, Center gravity (retina DPR 2.0 size)
   - ``screenshot_huge``: Lfill, Center gravity (1280 x 720)
   - ``screenshot_huge_2x``: Lfill, Center gravity (retina DPR 2.0 size)
   - ``thumb``: Thumb, Center gravity (90 x 90)
   - ``thumb_2x``: Thumb, Center gravity (retina DPR 2.0 size)
   - ``micro``: Thumb, Center gravity (35 x 35)
   - ``micro_2x``: Thumb, Center gravity (retina DPR 2.0 size)
   - ``720p``: Fit, Center gravity (1280 x 720)
   - ``720p_2x``: Fit, Center gravity (retina DPR 2.0 size)
   - ``1080p``: Fit, Center gravity (1920 x 1080)
   - ``1080p_2x``: Fit, Center gravity (retina DPR 2.0 size)

````
.then(
    games => {
        console.log(games[0].cover);
        /*
            Output of the first game's cover object:
            
            {
                url: '//images.igdb.com/igdb/image/upload/t_thumb/g7ty6o78s8dp3lclojxy.jpg',
                cloudinary_id: 'g7ty6o78s8dp3lclojxy',
                width: 460,
                height: 215
            }
        */

        // Passing the first game's cover object
        const coverUrl = igdb.url.image(games[0].cover, 'screenshot_med');

        console.log(coverUrl);
    }
)
````
Output:
```
https://images.igdb.com/igdb/image/upload/g7ty6o78s8dp3lclojxy/screenshot_med.png
```

According to the [IGDB Image Documentation](https://igdb.github.io/api/misc-objects/image) only the url parameter of the Image object is mandatory which can be a non-IGDB url. If the ``cloudinary_id`` is present in the result, the url will be returned by the passed size. If only the url exists in the object, then this url is returned.

## Interfaces

The following interfaces can be imported when the module is used in a TypeScript project:

### IGDB interfaces

```
import { IGDBOptions } from 'ts-igdb/interface/igdb';
```

These are declaring the types of the options object. It is enough to import only the IGDBOptions interface. OrderOption and FilterOption interfaces are part of IGDBOptions.

 - [IGDBOptions](https://github.com/enisz/ts-igdb/blob/master/interface/igdb/igdb-options.interface.ts)
 - [FilterOption](https://github.com/enisz/ts-igdb/blob/master/interface/igdb/filter-option.interface.ts)
 - [OrderOption](https://github.com/enisz/ts-igdb/blob/master/interface/igdb/order-option.interface.ts)

### Endpoint Responses
```
import { <INTERFACE> } from 'ts-igdb/interface/endpoint-response';
```

Every endpoint will return an array with elements from the related type. These interfaces can be imported from interface/endpoint-response.

 - [AchievementEndpointResponse](https://github.com/enisz/ts-igdb/blob/master/interface/endpoint-response/achievement-endpoint-response.interface.ts)
 - [CharacterEndpointResponse](https://github.com/enisz/ts-igdb/blob/master/interface/endpoint-response/character-endpoint-response.interface.ts)
 - [CollectionEndpointResponse](https://github.com/enisz/ts-igdb/blob/master/interface/endpoint-response/collection-endpoint-response.interface.ts)
 - [CompanyEndpointResponse](https://github.com/enisz/ts-igdb/blob/master/interface/endpoint-response/company-endpoint-response.interface.ts)
 - [CreditEndpointResponse](https://github.com/enisz/ts-igdb/blob/master/interface/endpoint-response/credit-endpoint-response.interface.ts)
 - [ExternalReviewEndpointResponse](https://github.com/enisz/ts-igdb/blob/master/interface/endpoint-response/external-review-endpoint-response.interface.ts)
 - [ExternalReviewSourceEndpointResponse](https://github.com/enisz/ts-igdb/blob/master/interface/endpoint-response/external-review-source-endpoint-response.interface.ts)
 - [FeedEndpointResponse](https://github.com/enisz/ts-igdb/blob/master/interface/endpoint-response/feed-endpoint-response.interface.ts)
 - [FranchiseEndpointResponse](https://github.com/enisz/ts-igdb/blob/master/interface/endpoint-response/franchise-endpoint-response.interface.ts)
 - [GameEndpointResponse](https://github.com/enisz/ts-igdb/blob/master/interface/endpoint-response/game-endpoint-response.interface.ts)
 - [GameEngineEndpointResponse](https://github.com/enisz/ts-igdb/blob/master/interface/endpoint-response/game-engine-endpoint-response.interface.ts)
 - [GameModeEndpointResponse](https://github.com/enisz/ts-igdb/blob/master/interface/endpoint-response/game-mode-endpoint-response.interface.ts)
 - [GenreEndpointResponse](https://github.com/enisz/ts-igdb/blob/master/interface/endpoint-response/genre-endpoint-response.interface.ts)
 - [KeywordEndpointResponse](https://github.com/enisz/ts-igdb/blob/master/interface/endpoint-response/keyword-endpoint-response.interface.ts)
 - [UserProfileEndpointResponse](https://github.com/enisz/ts-igdb/blob/master/interface/endpoint-response/me-endpoint-response.interface.ts)
 - [PageEndpointResponse](https://github.com/enisz/ts-igdb/blob/master/interface/endpoint-response/page-endpoint-response.interface.ts)
 - [PersonEndpointResponse](https://github.com/enisz/ts-igdb/blob/master/interface/endpoint-response/person-endpoint-response.interface.ts)
 - [PlatformEndpointResponse](https://github.com/enisz/ts-igdb/blob/master/interface/endpoint-response/platform-endpoint-response.interface.ts)
 - [PlayerPerspecitveEndpointResponse](https://github.com/enisz/ts-igdb/blob/master/interface/endpoint-response/player-perspective-endpoint-response.interface.ts)
 - [PulseEndpointResponse](https://github.com/enisz/ts-igdb/blob/master/interface/endpoint-response/pulse-endpoint-response.interface.ts)
 - [PulseGroupEndpointResponse](https://github.com/enisz/ts-igdb/blob/master/interface/endpoint-response/pulse-group-endpoint-response.interface.ts)
 - [PulseSourceEndpointResponse](https://github.com/enisz/ts-igdb/blob/master/interface/endpoint-response/pulse-source-endpoint-response.interface.ts)
 - [ReleaseDateEndpointResponse](https://github.com/enisz/ts-igdb/blob/master/interface/endpoint-response/release-date-endpoint-response.interface.ts)
 - [ReviewEndpointResponse](https://github.com/enisz/ts-igdb/blob/master/interface/endpoint-response/review-endpoint-response.interface.ts)
 - [ThemeEndpointResponse](https://github.com/enisz/ts-igdb/blob/master/interface/endpoint-response/theme-endpoint-response.interface.ts)
 - [TitleEndpointResponse](https://github.com/enisz/ts-igdb/blob/master/interface/endpoint-response/title-endpoint-response.interface.ts)
 - [GameVersionEndpointResponse](https://github.com/enisz/ts-igdb/blob/master/interface/endpoint-response/versions-endpoint-response.interface.ts)


 ### Miscellaneous Objects

```
import { <INTERFACE> } from 'ts-igdb/interface/miscellaneous';
```

Miscellaneous objects are entities which don’t have individual IDs and are only present in fields either as an object or as an array of objects.

 - [AlternativeName](https://github.com/enisz/ts-igdb/blob/master/interface/miscellaneous/alternative-name.interface.ts)
 - [ESRB](https://github.com/enisz/ts-igdb/blob/master/interface/miscellaneous/esrb.interface.ts)
 - [External](https://github.com/enisz/ts-igdb/blob/master/interface/miscellaneous/external.interface.ts)
 - [Image](https://github.com/enisz/ts-igdb/blob/master/interface/miscellaneous/image.interface.ts)
 - [PEGI](https://github.com/enisz/ts-igdb/blob/master/interface/miscellaneous/pegi.interface.ts)
 - [PlatformCompany](https://github.com/enisz/ts-igdb/blob/master/interface/miscellaneous/platform-company.interface.ts)
 - [PlatformVersionReleaseDate](https://github.com/enisz/ts-igdb/blob/master/interface/miscellaneous/platform-version-release-date.interface.ts)
 - [PlatformVersion](https://github.com/enisz/ts-igdb/blob/master/interface/miscellaneous/platform-version.interface.ts)
 - [Video](https://github.com/enisz/ts-igdb/blob/master/interface/miscellaneous/video.interface.ts)
 - [Website](https://github.com/enisz/ts-igdb/blob/master/interface/miscellaneous/website.interface.ts)