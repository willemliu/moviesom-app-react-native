export interface SeasonProps {
    air_date?: string;
    episode_count?: number;
    id: number;
    poster_path?: string;
    tv_id?: number;
    season_number?: number;
    overview?: string;
    episodes?: [{
        air_date?: string,
        crew: [{id?: number, credit_id?: number, name?: string, department?: string, job?: string, profile_path?: string}],
        episode_number?: number,
        guest_stars?: any[],
        name?: string,
        overview?: string,
        id?: number,
        production_code?: string,
        season_number?: number,
        still_path?: string,
        vote_average?: number,
        vote_count?: number
    }];
    name?: string;
}
