export interface PersonProps {
    adult?: boolean;
    also_known_as?: [any];
    biography?: string;
    birthday?: string;
    deathday?: string;
    gender?: 0|1|2;
    homepage?: string;
    id?: number;
    media_type?: string;
    imdb_id?: string;
    name?: string;
    place_of_birth?: string;
    popularity?: number;
    profile_path?: string;
}

export interface PersonNewsResponseType {
    getPersonNews?: {
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
