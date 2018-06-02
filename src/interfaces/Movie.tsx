export interface MovieProps {
    adult?: boolean;
    backdrop_path?: string;
    belongs_to_collection?: null|any;
    budget?: number;
    genres?: [{id?: number, name?: string}];
    homepage?: string;
    id?: number;
    imdb_id?: string;
    original_language?: string;
    original_title?: string;
    overview?: string;
    popularity?: number;
    poster_path?: string;
    production_companies?: [{name?: string, id?: number, logo_path?: string, origin_country?: string}];
    production_countries?: [{iso_3166_1?: string, name?: string}];
    release_date?: string;
    revenue?: number;
    runtime?: number;
    spoken_languages?: [{iso639_1?: string, name?: string}];
    status?: string;
    tagline?: string;
    title?: string;
    video?: boolean;
    vote_average?: number;
    vote_count?: number;
    media_type?: string;
    character?: string;
    job?: string;
    getUserMoviesSettings: (items: any[], token: string) => Promise<any[]>;
}

export interface GetUserMoviesSettings {
    token: string;
    movie_ids?: [{id: string}]|any;
    movie_tmdb_ids?: [{id: string}]|any;
    movie_imdb_ids?: [{id: string}]|any;
}

export interface GetUserMoviesSettingsResponse {
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

export interface GetUserTvSettings {
    token: string;
    tv_ids?: [{id: string}]|any;
    tv_tmdb_ids?: [{id: string}]|any;
    tv_imdb_ids?: [{id: string}]|any;
}

export interface GetUserEpisodeSettings {
    token: string;
    tv_episode_ids?: [{id: string}]|any;
    tv_episode_tmdb_ids?: [{id: string}]|any;
    tv_episode_imdb_ids?: [{id: string}]|any;
}

export interface MovieNewsResponseType {
    getMovieNews?: {
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
