export interface EpisodeProps {
    air_date?: string;
    crew?: [{id?: number, credit_id?: string, name?: string, department?: string, job?: string, profile_path?: string}];
    episode_number?: number;
    first_air_date?: string;
    guest_stars?: [{id?: number, credit_id?: string, name?: string, character?: string, order?: number, profile_path?: string}];
    name?: string;
    id?: number;
    overview?: string;
    production_code?: boolean;
    tv_id?: number;
    season_number?: number;
    still_path?: string;
    vote_average?: number;
    vote_count?: number;
    getUserEpisodeSettings: (items: any[], loginToken: string) => Promise<any[]>;
}
