import { Image, PlatformVersionReleaseDate } from "./";
import { PlatformCompany } from "./platform-company.interface";

export interface PlatformVersion {

    url: string,

    name: string,

    slug: string,

    cpu?: string,

    os?: string,

    media?: string,

    memory?: string,

    online?: string,

    output?: string,

    storage?: string,

    graphics?: string,

    resolutions?: string,

    connectivity?: string,

    /**
     * See the Image object reference
     */
    logo?: Image,

    summary?: string,

    /**
     * See the Platform version release date object reference
     */
    release_dates?: PlatformVersionReleaseDate[],

    /**
     * See the Platform company object reference
     */
    developers?: PlatformCompany[],

    /**
     * See the Platform company object reference
     */
    manufacturers?: PlatformCompany[]
}