import * as TmdbActions from './TmdbActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ADD_ITEM, SET_ITEMS } from './TmdbActions';
import SearchMovieResult from '../components/SearchMovieResult';
import MovieDetailScreen from '../screens/MovieDetailScreen';
import SearchScreen from '../screens/SearchScreen';
import TvDetailScreen from '../screens/TvDetailScreen';
import PersonDetailScreen from '../screens/PersonDetailScreen';
import CastAndCrewScreen from '../screens/CastAndCrewScreen';
import SearchPersonResult from '../components/SearchPersonResult';
import MovieDetailsScreen from '../screens/MovieDetailsScreen';
import { navigationParamsToProps } from '../utils/navigation';
import { withMovieSomFunctions } from '../utils/movieSom';
import SearchTvResult from '../components/SearchTvResult';

const defaultState = {
    tmdbItems: new Array()
};

export function tmdbReducer(state: any = defaultState, action: any) {
    const newState = Object.assign({}, state);
    switch (action.type) {
        case ADD_ITEM:
            const itemState = newState.tmdbItems.find((value: any, index: number, arr: any[]) => {
                const sameItem = (value.id === action.item.id
                    && action.item.media_type
                    && value.media_type === action.item.media_type);
                // Merge the new item with the old and return it.
                if (sameItem) {
                    console.log('MERGE', action.item.media_type, action.item.id);
                    arr[index] = Object.assign({}, value, action.item);
                }
                return sameItem;
            });
            if (!itemState) {
                console.log('INSERT', action.item.media_type, action.item.id);
                newState.tmdbItems.push(action.item);
            }
            return newState;
        case SET_ITEMS:
            newState.tmdbItems = action.items;
            return newState;
        default:
            return newState;
    }
}

function mapStateToProps(state: any, ownProps: any) {
    return {
        ...(state.tmdb.tmdbItems.find((value: any) => {
            const result = (value.id === ownProps.id && value.media_type === ownProps.media_type)
            || (ownProps.navigation
                && value.id === ownProps.navigation.getParam('id')
                && value.media_type === ownProps.navigation.getParam('media_type'));
            return result;
        }))
    };
}
function mapMovieStateToProps(state: any, ownProps: any) {
    return {
        ...(state.tmdb.tmdbItems.find((value: any) => {
            const result = (value.id === ownProps.id && value.media_type === 'movie')
            || (ownProps.navigation
                && value.id === ownProps.navigation.getParam('id')
                && ownProps.navigation.getParam('media_type') === 'movie');
            return result;
        }))
    };
}
function mapPersonStateToProps(state: any, ownProps: any) {
    return {
        ...(state.tmdb.tmdbItems.find((value: any) => {
            const result = (value.id === ownProps.id && value.media_type === 'person')
            || (ownProps.navigation
                && value.id === ownProps.navigation.getParam('id')
                && ownProps.navigation.getParam('media_type') === 'person');
            return result;
        }))
    };
}
function mapTvStateToProps(state: any, ownProps: any) {
    return {
        ...(state.tmdb.tmdbItems.find((value: any) => {
            const result = (value.id === ownProps.id && value.media_type === 'tv')
            || (ownProps.navigation
                && value.id === ownProps.navigation.getParam('id')
                && ownProps.navigation.getParam('media_type') === 'tv');
            return result;
        }))
    };
}

function withItemsToProps(Function: any) {
    return (state: any, ownProps: any) => {
        return Object.assign({}, Function(state, ownProps), {tmdbItems: state.tmdb.tmdbItems});
    };
}

function mapTmdbDispatchToProps(dispatch: any, ownProps: any) {
    return {
        actions: bindActionCreators(TmdbActions as any, dispatch)
    };
}

const searchMovieResult = connect(mapMovieStateToProps, mapTmdbDispatchToProps)(withMovieSomFunctions(SearchMovieResult));
export {searchMovieResult as SearchMovieResult};

const searchTvResult = connect(mapTvStateToProps, mapTmdbDispatchToProps)(withMovieSomFunctions(SearchTvResult));
export {searchTvResult as SearchTvResult};

const searchPersonResult = connect(mapPersonStateToProps, mapTmdbDispatchToProps)(withMovieSomFunctions(SearchPersonResult));
export {searchPersonResult as SearchPersonResult};

const movieDetailScreen = navigationParamsToProps(connect(mapMovieStateToProps, mapTmdbDispatchToProps)(withMovieSomFunctions(MovieDetailScreen)));
export {movieDetailScreen as MovieDetailScreen};

const tvDetailScreen = navigationParamsToProps(connect(mapTvStateToProps, mapTmdbDispatchToProps)(withMovieSomFunctions(TvDetailScreen)));
export {tvDetailScreen as TvDetailScreen};

const personDetailScreen = navigationParamsToProps(connect(mapPersonStateToProps, mapTmdbDispatchToProps)(withMovieSomFunctions(PersonDetailScreen)));
export {personDetailScreen as PersonDetailScreen};

const searchScreen = connect(mapStateToProps, mapTmdbDispatchToProps)(SearchScreen);
export {searchScreen as SearchScreen};

const castAndCrewScreen = navigationParamsToProps(connect(mapStateToProps, mapTmdbDispatchToProps)(CastAndCrewScreen));
export {castAndCrewScreen as CastAndCrewScreen};
