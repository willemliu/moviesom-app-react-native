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
            let movieState = newState.movies.find((value: any, index: number) => value.id === action.movie.id);
            if (movieState) {
                console.log('Update movie');
                movieState = Object.assign(movieState, action.movie);
            } else {
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

export function mapMoviesStateToProps(state: any, ownProps: any) {
    return {
        movies: state.movies.movies,
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

export function mapMoviesDispatchToProps(dispatch: any, ownProps: any) {
    return {
        actions: bindActionCreators(MovieActions as any, dispatch)
    };
}

const searchMovieResult = connect(mapMoviesStateToProps, mapMoviesDispatchToProps)(SearchMovieResult);
export {searchMovieResult as SearchMovieResult};

const movieDetailScreen = connect(mapMoviesStateToProps, mapMoviesDispatchToProps)(MovieDetailScreen);
export {movieDetailScreen as MovieDetailScreen};

const searchScreen = connect(mapMoviesStateToProps, mapMoviesDispatchToProps)(SearchScreen);
export {searchScreen as SearchScreen};
