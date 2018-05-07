import * as MovieActions from './MoviesActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ADD_MOVIE, SET_MOVIES } from './MoviesActions';
import SearchMovieResult from '../components/SearchMovieResult';
import MovieDetailScreen from '../screens/MovieDetailScreen';
import SearchScreen from '../screens/SearchScreen';

const defaultState = {
    movies: new Array()
};

export function movieReducer(state: any = defaultState, action: any) {
    const newState = Object.assign({}, state);
    switch (action.type) {
        case ADD_MOVIE:
            console.info(`Reduce ${ADD_MOVIE}`);
            const movieState = newState.movies.find((value: any, index: number, arr: any[]) => {
                const sameItem = value.id === action.movie.id;
                if (sameItem) {
                    console.log('Update movie');
                    arr[index] = Object.assign({}, value, action.movie);
                }
                return sameItem;
            });
            if (!movieState) {
                newState.movies.push(action.movie);
            }
            return newState;
        case SET_MOVIES:
            newState.movies = action.movies;
            return newState;
        default:
            return newState;
    }
}

export function mapMovieStateToProps(state: any, ownProps: any) {
    return {
        ownMovie: state.movies.movies.find((value: any) => {
            let result = false;
            if (ownProps.navigation) {
                result = (ownProps.navigation.getParam('id') === value.id) || (value.id === ownProps.id);
            } else {
                result = (value.id === ownProps.id);
            }
            return result;
        })
    };
}

export function withMovies(Function: any) {
    return (state: any, ownProps: any) => {
        return Object.assign({}, Function(state, ownProps), {movies: state.movies.movies});
    };
}

export function mapMoviesDispatchToProps(dispatch: any, ownProps: any) {
    return {
        actions: bindActionCreators(MovieActions as any, dispatch)
    };
}

const searchMovieResult = connect(mapMovieStateToProps, mapMoviesDispatchToProps)(SearchMovieResult);
export {searchMovieResult as SearchMovieResult};

const movieDetailScreen = connect(mapMovieStateToProps, mapMoviesDispatchToProps)(MovieDetailScreen);
export {movieDetailScreen as MovieDetailScreen};

const searchScreen = connect(withMovies(mapMovieStateToProps), mapMoviesDispatchToProps)(SearchScreen);
export {searchScreen as SearchScreen};
