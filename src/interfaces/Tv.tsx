export interface TvProps {
    backdrop_path?: string;
    created_by?: [{id?: number, name?: string, gender?: 0|1|2, profile_path?: string}];
    episode_run_time?: number[];
    first_air_date?: string;
    genres?: [{id?: number, name?: string}];
    homepage?: string;
    id: number;
    imdb_id?: string;
    in_production?: boolean;
    languages?: string[];
    last_air_date?: string;
    name?: string;
    networs?: [{id?: number, name: string}];
    number_of_episodes?: number;
    number_of_seasons?: number;
    origin_country?: string[];
    origial_language?: string;
    original_name?: string;
    overview?: string;
    popularity?: number;
    poster_path?: string;
    production_companies?: [{name?: string, id?: number, logo_path?: string, origin_country?: string}];
    seasons?: [{air_date?: string, episode_count?: number, id?: number, poster_path?: string, season_number?: number}];
    status?: string;
    type?: string;
    vote_average?: number;
    vote_count?: number;
    character?: string;
    job?: string;
    getUserTvSettings: (items: any[], loginToken: string) => Promise<any[]>;
}

export interface GetUserTvSettingsResponse {
    watched: number;
    want_to_watch: number;
    blu_ray: string;
    dvd: string;
    digital: string;
    other: string;
    lend_out: string;
    note: string;
    recommend: string;
    added: string;
    updated: string;
    in_cinema: string;
}

export interface TvNewsResponseType {
    getTvNews?: {
        status: number,
        message?: [{
            id: number,
            title: string,
            type: string,
            image: string,
            url: string,
            description: string,
            url_hash: string,
            visible: number
        }],
        offset: number,
        execTime: number
    };
    execTime: number;
}
