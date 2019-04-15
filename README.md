**This class is DEPRECATED**

This class was written to the V2 api of IGDB. This version of the api will be discontinued and unsupported from 30th of June, 2019. 

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
    + [credit](#credit)
    + [externalReview](#externalreview)
    + [externalReviewSource](#externalreviewsource)
    + [feed](#feed)
    + [franchise](#franchise)
    + [game](#game)
    + [gameEngine](#gameengine)
    + [gameMode](#gamemode)
    + [gameVersion](#gameversion)
    + [genre](#genre)
    + [keyword](#keyword)
    + [page](#page)
    + [person](#person)
    + [platform](#platform)
    + [playerPerspecitve](#playerperspecitve)
    + [pulse](#pulse)
    + [pulseGroup](#pulsegroup)
    + [pulseSource](#pulsesource)
    + [releaseDate](#releasedate)
    + [review](#review)
    + [theme](#theme)
    + [title](#title)
    + [userProfile](#userprofile)
  * [IGDB url](#igdb-url)
    + [Query String](#query-string)
    + [Api URL](#api-url)
    + [Query URL](#query-url)
    + [Image](#image)
- [Interfaces](#interfaces)
  * [IGDB interfaces](#igdb-interfaces)
  * [Endpoint Responses](#endpoint-responses)
  * [Miscellaneous Objects](#miscellaneous-objects)
- [Examples](#examples)
  * [Get all information from a specific game](#get-all-information-from-a-specific-game)
  * [Get all games from specific genres](#get-all-games-from-specific-genres)
  * [Count total games that have a rating higher than 75](#count-total-games-that-have-a-rating-higher-than-75)
  * [Count total games from a certain platform](#count-total-games-from-a-certain-platform)
  * [Order by popularity](#order-by-popularity)
  * [Coming soon games for Playstation 4](#coming-soon-games-for-playstation-4)
  * [Search, return certain fields.](#search-return-certain-fields)
  * [Search games but exclude versions (editions)](#search-games-but-exclude-versions-editions)
  * [Get versions (editions) of a game](#get-versions-editions-of-a-game)
  * [Get the parent game for a version](#get-the-parent-game-for-a-version)
- [Changelog](#changelog)
  * [2019.03.02 - v1.1.3](#20190302---v113)

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
First, you have to set up an [options object](#options) which will be used to construct the query url against IGDB.

When the object is ready, you can call the module's specific [endpoint method](#igdb-endpoint), passing this object as a parameter to it. These methods will always return a promise.

Javascript example:
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
        // 'games' will contain all results as an array
        console.log(games);
    }
)
.catch(
    error => {
        // in case of an error, the error object will be returned
        console.log(error.message);
    }
)
```

Typescript example:
```
// index.ts
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
        // 'games' will contain all results as an array
        console.log(games);
    }
)
.catch(
    (error: any) => {
        // in case of an error, the error object will be returned
        console.log(error.message);
    }
)
```

## Options
Every endpoint method will expect an ``options`` object which will set the request's parameters. The object can contain the following keys:
 - ``id [optional]``: One ore more ID's as an array. When ID is provided, the search parameter will be ignored. 
 - ``search [optional]``: The query will search the name field looking for this value as a string. If id is provided in the same options object, than this value will be ignored.
 - ``fields [optional]``: The fields you want to see in the result array. If every field is required an array with a single star element can be set ( `` search: ['*'] `` ). If not provided only the id field will be returned.
 - ``limit [optional]``: The maximum number of results in a single query. This value must be a number between 1 and 50. If not provided, IGDB's default value will be used (at the time of writing the default limit is 10)
 - ``offset [optional]``: This will start the result list at the provided value and will give limit number of results. This value must be a number (0 or greater). By default the results will be returned from the first element (0).
 - ``expand [optional]``: The expander feature is used to combine multiple requests. Have to be provided as an array of strings.
 - ``filters [optional]``: Filters are used to swift through results to get what you want. You can exclude and include results based on their properties. The parameter have to be provided as an array. The elements have to be objects with the following parameters (these are not optional, all three parameters are required):
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
   - ``value``: The value of the filter. This can be a string, a number or an array.
 - ``order [optional]``: Ordering (sorting) is used to order results by a specific field. When not provided, the results will be ordered ASCENDING by ID. This have to be an object with the following parameters:
      - ``field``: The field you want to do the ordering by as a string
      - ``direction``: The direction of the ordering. This can have one of the following values:
        - ``asc``: ascending ordering
        - ``desc``: descending ordering
      - ``subfilter [optional]``: You can apply this optional subfilter for even more complex ordering. Available subfilters are:
        - ``min``
        - ``max``
        - ``avg``
        - ``sum``
        - ``median``
 - ``count [optional]``: This is a boolean value whether you want to get the results, or the sum of all the records that match the provided filters. In case of boolean TRUE only a single object will be returned with a ``count`` property, containing the number of the matched results. If count is provided in the options object, only the ``filters`` parameter will be processed (if presents). If no filter is passed, everything on that endpoint will be counted.

## Methods
### IGDB endpoint
Data can be requested from most of the IGDB endpoints. For more information on the returned data can be found in the [IGDB Endpoint documentation](https://igdb.github.io/api/endpoints)

Every endpoint method expects an ``options`` object to set up the request and returns a ``Promise``. In case of a successful request the ``Promise`` will resolve the results as an array. If the request failed it will reject the [Got module](https://www.npmjs.com/package/got)'s error object.

#### achievements

``IGDB.endpoint.achievements(options: ``[``IGDBOptions``](interface/igdb/igdb-options.interface.ts)``): Promise<``[``AchievementsEndpointResponse``](interface/endpoint-response/achievements-endpoint-response.interface.ts)``[]>``
<br/><br/>
For more information check the [IGDB Achievements Endpoint Documentation](https://igdb.github.io/api/endpoints/achievement).


#### character

``IGDB.endpoint.character(options: ``[``IGDBOptions``](interface/igdb/igdb-options.interface.ts)``): Promise<``[``CharacterEndpointResponse``](interface/endpoint-response/character-endpoint-response.interface.ts)``[]>``
<br/><br/>
For more information check the [IGDB Character Endpoint Documentation](https://igdb.github.io/api/endpoints/character).


#### collection

``IGDB.endpoint.collection(options: ``[``IGDBOptions``](interface/igdb/igdb-options.interface.ts)``): Promise<``[``CollectionEndpointResponse``](interface/endpoint-response/collection-endpoint-response.interface.ts)``[]>``
<br/><br/>
For more information check the [IGDB Collection Endpoint Documentation](https://igdb.github.io/api/endpoints/collection).


#### company

``IGDB.endpoint.company(options: ``[``IGDBOptions``](interface/igdb/igdb-options.interface.ts)``): Promise<``[``CompanyEndpointResponse``](interface/endpoint-response/company-endpoint-response.interface.ts)``[]>``
<br/><br/>
For more information check the [IGDB Company Endpoint Documentation](https://igdb.github.io/api/endpoints/company).


#### credit

``IGDB.endpoint.credit(options: ``[``IGDBOptions``](interface/igdb/igdb-options.interface.ts)``): Promise<``[``CreditEndpointResponse``](interface/endpoint-response/credit-endpoint-response.interface.ts)``[]>``
<br/><br/>
For more information check the [IGDB Credit Endpoint Documentation](https://igdb.github.io/api/endpoints/credit).


#### externalReview

``IGDB.endpoint.externalReview(options: ``[``IGDBOptions``](interface/igdb/igdb-options.interface.ts)``): Promise<``[``ExternalReviewEndpointResponse``](interface/endpoint-response/external-review-endpoint-response.interface.ts)``[]>``
<br/><br/>
For more information check the [IGDB External Review Endpoint Documentation](https://igdb.github.io/api/endpoints/external-review).


#### externalReviewSource

``IGDB.endpoint.externalReviewSource(options: ``[``IGDBOptions``](interface/igdb/igdb-options.interface.ts)``): Promise<``[``ExternalReviewSourceEndpointResponse``](interface/endpoint-response/external-review-source-endpoint-response.interface.ts)``[]>``
<br/><br/>
For more information check the [IGDB External Review Source Endpoint Documentation](https://igdb.github.io/api/endpoints/external-review-source).


#### feed

``IGDB.endpoint.feed(options: ``[``IGDBOptions``](interface/igdb/igdb-options.interface.ts)``): Promise<``[``FeedEndpointResponse``](interface/endpoint-response/feed-endpoint-response.interface.ts)``[]>``
<br/><br/>
For more information check the [IGDB Feed Endpoint Documentation](https://igdb.github.io/api/endpoints/feed).


#### franchise

``IGDB.endpoint.franchise(options: ``[``IGDBOptions``](interface/igdb/igdb-options.interface.ts)``): Promise<``[``FranchiseEndpointResponse``](interface/endpoint-response/franchise-endpoint-response.interface.ts)``[]>``
<br/><br/>
For more information check the [IGDB Franchise Endpoint Documentation](https://igdb.github.io/api/endpoints/franchise).


#### game

``IGDB.endpoint.game(options: ``[``IGDBOptions``](interface/igdb/igdb-options.interface.ts)``): Promise<``[``GameEndpointResponse``](interface/endpoint-response/game-endpoint-response.interface.ts)``[]>``
<br/><br/>
For more information check the [IGDB Game Endpoint Documentation](https://igdb.github.io/api/endpoints/game).


#### gameEngine

``IGDB.endpoint.gameEngine(options: ``[``IGDBOptions``](interface/igdb/igdb-options.interface.ts)``): Promise<``[``GameEngineEndpointResponse``](interface/endpoint-response/game-engine-endpoint-response.interface.ts)``[]>``
<br/><br/>
For more information check the [IGDB Game Engine Endpoint Documentation](https://igdb.github.io/api/endpoints/game-engine).


#### gameMode

``IGDB.endpoint.gameMode(options: ``[``IGDBOptions``](interface/igdb/igdb-options.interface.ts)``): Promise<``[``GameModeEndpointResponse``](interface/endpoint-response/game-mode-endpoint-response.interface.ts)``[]>``
<br/><br/>
For more information check the [IGDB Game Mode Endpoint Documentation](https://igdb.github.io/api/endpoints/game-mode).


#### gameVersion

``IGDB.endpoint.gameVersion(options: ``[``IGDBOptions``](interface/igdb/igdb-options.interface.ts)``): Promise<``[``GameVersionEndpointResponse``](interface/endpoint-response/versions-endpoint-response.interface.ts)``[]>``
<br/><br/>
For more information check the [IGDB Game Version Endpoint Documentation](https://igdb.github.io/api/endpoints/versions).


#### genre

``IGDB.endpoint.genre(options: ``[``IGDBOptions``](interface/igdb/igdb-options.interface.ts)``): Promise<``[``GenreEndpointResponse``](interface/endpoint-response/genre-endpoint-response.interface.ts)``[]>``
<br/><br/>
For more information check the [IGDB Genre Endpoint Documentation](https://igdb.github.io/api/endpoints/genre).


#### keyword

``IGDB.endpoint.keyword(options: ``[``IGDBOptions``](interface/igdb/igdb-options.interface.ts)``): Promise<``[``KeywordEndpointResponse``](interface/endpoint-response/keyword-endpoint-response.interface.ts)``[]>``
<br/><br/>
For more information check the [IGDB Keyword Endpoint Documentation](https://igdb.github.io/api/endpoints/keyword).


#### page

``IGDB.endpoint.page(options: ``[``IGDBOptions``](interface/igdb/igdb-options.interface.ts)``): Promise<``[``PageEndpointResponse``](interface/endpoint-response/page-endpoint-response.interface.ts)``[]>``
<br/><br/>
For more information check the [IGDB Page Endpoint Documentation](https://igdb.github.io/api/endpoints/page).


#### person

``IGDB.endpoint.person(options: ``[``IGDBOptions``](interface/igdb/igdb-options.interface.ts)``): Promise<``[``PersonEndpointResponse``](interface/endpoint-response/person-endpoint-response.interface.ts)``[]>``
<br/><br/>
For more information check the [IGDB Person Endpoint Documentation](https://igdb.github.io/api/endpoints/person).


#### platform

``IGDB.endpoint.platform(options: ``[``IGDBOptions``](interface/igdb/igdb-options.interface.ts)``): Promise<``[``PlatformEndpointResponse``](interface/endpoint-response/platform-endpoint-response.interface.ts)``[]>``
<br/><br/>
For more information check the [IGDB Platform Endpoint Documentation](https://igdb.github.io/api/endpoints/platform).


#### playerPerspecitve

``IGDB.endpoint.playerPerspecitve(options: ``[``IGDBOptions``](interface/igdb/igdb-options.interface.ts)``): Promise<``[``PlayerPerspecitveEndpointResponse``](interface/endpoint-response/player-perspective-endpoint-response.interface.ts)``[]>``
<br/><br/>
For more information check the [IGDB Player Perspecitve Endpoint Documentation](https://igdb.github.io/api/endpoints/player-perspective).


#### pulse

``IGDB.endpoint.pulse(options: ``[``IGDBOptions``](interface/igdb/igdb-options.interface.ts)``): Promise<``[``PulseEndpointResponse``](interface/endpoint-response/pulse-endpoint-response.interface.ts)``[]>``
<br/><br/>
For more information check the [IGDB Pulse Endpoint Documentation](https://igdb.github.io/api/endpoints/pulse).


#### pulseGroup

``IGDB.endpoint.pulseGroup(options: ``[``IGDBOptions``](interface/igdb/igdb-options.interface.ts)``): Promise<``[``PulseGroupEndpointResponse``](interface/endpoint-response/pulse-group-endpoint-response.interface.ts)``[]>``
<br/><br/>
For more information check the [IGDB Pulse Group Endpoint Documentation](https://igdb.github.io/api/endpoints/pulse-group).


#### pulseSource

``IGDB.endpoint.pulseSource(options: ``[``IGDBOptions``](interface/igdb/igdb-options.interface.ts)``): Promise<``[``PulseSourceEndpointResponse``](interface/endpoint-response/pulse-source-endpoint-response.interface.ts)``[]>``
<br/><br/>
For more information check the [IGDB Pulse Source Endpoint Documentation](https://igdb.github.io/api/endpoints/pulse-source).


#### releaseDate

``IGDB.endpoint.releaseDate(options: ``[``IGDBOptions``](interface/igdb/igdb-options.interface.ts)``): Promise<``[``ReleaseDateEndpointResponse``](interface/endpoint-response/release-date-endpoint-response.interface.ts)``[]>``
<br/><br/>
For more information check the [IGDB Release Date Endpoint Documentation](https://igdb.github.io/api/endpoints/release-date).


#### review

``IGDB.endpoint.review(options: ``[``IGDBOptions``](interface/igdb/igdb-options.interface.ts)``): Promise<``[``ReviewEndpointResponse``](interface/endpoint-response/review-endpoint-response.interface.ts)``[]>``
<br/><br/>
For more information check the [IGDB Review Endpoint Documentation](https://igdb.github.io/api/endpoints/review).


#### theme

``IGDB.endpoint.theme(options: ``[``IGDBOptions``](interface/igdb/igdb-options.interface.ts)``): Promise<``[``ThemeEndpointResponse``](interface/endpoint-response/theme-endpoint-response.interface.ts)``[]>``
<br/><br/>
For more information check the [IGDB Theme Endpoint Documentation](https://igdb.github.io/api/endpoints/theme).


#### title

``IGDB.endpoint.title(options: ``[``IGDBOptions``](interface/igdb/igdb-options.interface.ts)``): Promise<``[``TitleEndpointResponse``](interface/endpoint-response/title-endpoint-response.interface.ts)``[]>``
<br/><br/>
For more information check the [IGDB Title Endpoint Documentation](https://igdb.github.io/api/endpoints/title).


#### userProfile

``IGDB.endpoint.userProfile(options: ``[``IGDBOptions``](interface/igdb/igdb-options.interface.ts)``): Promise<``[``UserProfileEndpointResponse``](interface/endpoint-response/me-endpoint-response.interface.ts)``[]>``
<br/><br/>
For more information check the [IGDB User Profile Endpoint Documentation](https://igdb.github.io/api/endpoints/me).


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
import { <INTERFACES> } from 'ts-igdb/interface/igdb';
```

IGDBOptions can be imported from here which is declaring the type of the options object. It is enough to import only the IGDBOptions interface, since FilterOption and OrderOption is part of the IGDB object. However you can import them if required.

 - [IGDBOptions](interface/igdb/igdb-options.interface.ts)
 - [FilterOption](interface/igdb/filter-option.interface.ts)
 - [OrderOption](interface/igdb/order-option.interface.ts)

### Endpoint Responses
```
import { <INTERFACE> } from 'ts-igdb/interface/endpoint-response';
```

Every endpoint will return an array with elements from the related type. These interfaces can be imported from interface/endpoint-response.

 - [AchievementsEndpointResponse](interface/endpoint-response/achievements-endpoint-response.interface.ts)
 - [CharacterEndpointResponse](interface/endpoint-response/character-endpoint-response.interface.ts)
 - [CollectionEndpointResponse](interface/endpoint-response/collection-endpoint-response.interface.ts)
 - [CompanyEndpointResponse](interface/endpoint-response/company-endpoint-response.interface.ts)
 - [CreditEndpointResponse](interface/endpoint-response/credit-endpoint-response.interface.ts)
 - [ExternalReviewEndpointResponse](interface/endpoint-response/external-review-endpoint-response.interface.ts)
 - [ExternalReviewSourceEndpointResponse](interface/endpoint-response/external-review-source-endpoint-response.interface.ts)
 - [FeedEndpointResponse](interface/endpoint-response/feed-endpoint-response.interface.ts)
 - [FranchiseEndpointResponse](interface/endpoint-response/franchise-endpoint-response.interface.ts)
 - [GameEndpointResponse](interface/endpoint-response/game-endpoint-response.interface.ts)
 - [GameEngineEndpointResponse](interface/endpoint-response/game-engine-endpoint-response.interface.ts)
 - [GameModeEndpointResponse](interface/endpoint-response/game-mode-endpoint-response.interface.ts)
 - [GenreEndpointResponse](interface/endpoint-response/genre-endpoint-response.interface.ts)
 - [KeywordEndpointResponse](interface/endpoint-response/keyword-endpoint-response.interface.ts)
 - [UserProfileEndpointResponse](interface/endpoint-response/me-endpoint-response.interface.ts)
 - [PageEndpointResponse](interface/endpoint-response/page-endpoint-response.interface.ts)
 - [PersonEndpointResponse](interface/endpoint-response/person-endpoint-response.interface.ts)
 - [PlatformEndpointResponse](interface/endpoint-response/platform-endpoint-response.interface.ts)
 - [PlayerPerspecitveEndpointResponse](interface/endpoint-response/player-perspective-endpoint-response.interface.ts)
 - [PulseEndpointResponse](interface/endpoint-response/pulse-endpoint-response.interface.ts)
 - [PulseGroupEndpointResponse](interface/endpoint-response/pulse-group-endpoint-response.interface.ts)
 - [PulseSourceEndpointResponse](interface/endpoint-response/pulse-source-endpoint-response.interface.ts)
 - [ReleaseDateEndpointResponse](interface/endpoint-response/release-date-endpoint-response.interface.ts)
 - [ReviewEndpointResponse](interface/endpoint-response/review-endpoint-response.interface.ts)
 - [ThemeEndpointResponse](interface/endpoint-response/theme-endpoint-response.interface.ts)
 - [TitleEndpointResponse](interface/endpoint-response/title-endpoint-response.interface.ts)
 - [GameVersionEndpointResponse](interface/endpoint-response/versions-endpoint-response.interface.ts)


 ### Miscellaneous Objects

```
import { <INTERFACE> } from 'ts-igdb/interface/miscellaneous';
```

Miscellaneous objects are entities which don’t have individual IDs and are only present in fields either as an object or as an array of objects.

 - [AlternativeName](interface/miscellaneous/alternative-name.interface.ts)
 - [ESRB](interface/miscellaneous/esrb.interface.ts)
 - [External](interface/miscellaneous/external.interface.ts)
 - [Image](interface/miscellaneous/image.interface.ts)
 - [PEGI](interface/miscellaneous/pegi.interface.ts)
 - [PlatformCompany](interface/miscellaneous/platform-company.interface.ts)
 - [PlatformVersionReleaseDate](interface/miscellaneous/platform-version-release-date.interface.ts)
 - [PlatformVersion](interface/miscellaneous/platform-version.interface.ts)
 - [Video](interface/miscellaneous/video.interface.ts)
 - [Website](interface/miscellaneous/website.interface.ts)

For more information check the [IGDB Miscellaneous Objects Documentation](https://igdb.github.io/api/misc-objects)

## Examples
These examples are available in the examples folder of this project on GitHub. The examples are taken from [IGDB's example page](https://igdb.github.io/api/examples).

### Get all information from a specific game
```
/*

    Get all information from a specific game
    /games/1942?fields=*

    1942, is the ID of the game.

*/

import IGDB from 'ts-igdb';
import { IGDBOptions } from 'ts-igdb/interface/igdb';
import { GameEndpointResponse } from 'ts-igdb/interface/endpoint-response';

const igdb = new IGDB('<YOU API KEY>');

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
```

### Get all games from specific genres
```
/*

    Get all games from specific genres
    /genres/12,9,11?fields=*

    Notice you can comma separate multiple IDs (12, 9 and 11). You can do this with games, companies and anything else.

*/

import IGDB from 'ts-igdb';
import { IGDBOptions } from 'ts-igdb/interface/igdb';
import { GenreEndpointResponse } from 'ts-igdb/interface/endpoint-response';

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
```

### Count total games that have a rating higher than 75
```
/*

    Count total games that have a rating higher than 75
    /games/count?filter[rating][gt]=75

*/

import IGDB from 'ts-igdb';
import { IGDBOptions } from 'ts-igdb/interface/igdb';
import { GameEndpointResponse } from 'ts-igdb/interface/endpoint-response';

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
        // When using count, the response will be an array with one element with only one property: count
        console.log(response[0].count);
    }
)
.catch(
    (error: any) => console.log(error.message)
)
```

### Count total games from a certain platform 
```
/*

    Count total games from a certain platform (Playstation 4 , id=48)
    /games/count?filter[release_dates.platform][eq]=48

*/

import IGDB from 'ts-igdb';
import { IGDBOptions } from 'ts-igdb/interface/igdb';
import { GameEndpointResponse } from 'ts-igdb/interface/endpoint-response';

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
```



### Order by popularity
```
/*

    Order by popularity
    Popularity parameter for games. You can access it like this: /games/?fields=name,popularity&order=popularity:desc

    The popularity number is calculated using usage statistics of game pages at https://www.igdb.com

*/

import IGDB from 'ts-igdb';
import { IGDBOptions } from 'ts-igdb/interface/igdb';
import { GameEndpointResponse } from 'ts-igdb/interface/endpoint-response';

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
```

### Coming soon games for Playstation 4
```
/*

    Coming soon games for Playstation 4
    /release_dates/?fields=*&filter[platform][eq]=48&order=date:asc&filter[date][gt]=1500619813000&expand=game

    1500619813000: Is the timestamp in milliseconds of today (This you need to generate yourself) 48 Is the platform id of Playstation 4.

*/

import IGDB from 'ts-igdb';
import { IGDBOptions } from 'ts-igdb/interface/igdb';
import { ReleaseDateEndpointResponse } from 'ts-igdb/interface/endpoint-response';

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
```

### Search, return certain fields.
```
/*

    Search, return certain fields.
    /games/?search=Halo

    This will return search results and the IDs of the games. If you want to return certain fields of the game or even all, do the following:

    /games/?search=Halo&fields=name,publishers /games/?search=Halo&fields=*

*/

import IGDB from 'ts-igdb';
import { IGDBOptions } from 'ts-igdb/interface/igdb';
import { GameEndpointResponse } from 'ts-igdb/interface/endpoint-response';

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
```

### Search games but exclude versions (editions)
```
/*

    Search games but exclude versions (editions)
    /games/?search=Assassins%20Creed&fields=name&filter[version_parent][not_exists]=1

    This will return search results with ID and name of the game but exclude editions such as “Collectors Edition”.

*/

import IGDB from 'ts-igdb';
import { IGDBOptions } from 'ts-igdb/interface/igdb';
import { GameEndpointResponse } from 'ts-igdb/interface/endpoint-response';

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
```

### Get versions (editions) of a game 
```
/*

    Get versions (editions) of a game
    /game_versions/?fields=games,games.name&filter[game][eq]=28540&expand=games

    This resulting object will contain a list of version ids and names.

*/

import IGDB from 'ts-igdb';
import { IGDBOptions } from 'ts-igdb/interface/igdb';
import { GameVersionEndpointResponse } from 'ts-igdb/interface/endpoint-response';

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
```

### Get the parent game for a version
```
/*

    Get the parent game for a version
    /games/39047?fields=version_parent

    This resulting object will contain the id of the parent game (version_parent).

*/

import IGDB from 'ts-igdb';
import { IGDBOptions } from 'ts-igdb/interface/igdb';
import { GameEndpointResponse } from 'ts-igdb/interface/endpoint-response';

const igdb = new IGDB('<YOUR API KEY>');

const options: IGDBOptions = {
    id: [39047],
    fields: ['version_parent']
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
```

## Changelog
### 2019.03.02 - v1.1.3
 - Updated dependencies: nodemon had a potential security vulnerability
 - Updated endpoint method names: converted method names to Camel Case
   - external_review => [externalReview](#externalreview)
   - external_review_source => [externalReviewSource](#externalreviewsource)
   - game_engine => [gameEngine](#gameengine)
   - game_mode => [gameMode](#gameMode)
   - game_version => [gameVersion](#gameversion)
   - player_perspective => [playerPerspecitve](#playerperspecitve)
   - pulse_group => [pulseGroup](#pulsegroup)
   - pulse_source => [pulseSource](#pulsesource)
   - release_date => [releaseDate](#releasedate)
   - user_profile => [userProfile](#userprofile)
