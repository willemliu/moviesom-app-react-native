export const ADD_MOVIE = 'ADD_MOVIE';
export const SET_MOVIES = 'SET_MOVIES';

export function addMovie(movie: any) {
    console.log(ADD_MOVIE, movie.id);
    return { type: ADD_MOVIE, movie };
}

export function setMovies(movies: any[]) {
    console.log(SET_MOVIES, movies.length);
    return { type: SET_MOVIES, movies };
}
