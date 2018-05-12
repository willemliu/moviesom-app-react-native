import * as TmdbActions from './TmdbActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ADD_ITEM, SET_ITEMS, ADD_ITEMS } from './TmdbActions';
import SearchMovieResult from '../components/SearchMovieResult';
import MovieDetailScreen from '../screens/MovieDetailScreen';
import SearchScreen from '../screens/SearchScreen';
import TvDetailScreen from '../screens/TvDetailScreen';
import PersonDetailScreen from '../screens/PersonDetailScreen';
import CastAndCrewScreen from '../screens/CastAndCrewScreen';
import SearchPersonResult from '../components/SearchPersonResult';
import MovieDetailsScreen from '../screens/MovieDetailsScreen';
import { navigationParamsToProps } from '../utils/navigation';
import { enhanceWithMovieSomFunctions } from '../utils/movieSom';
import SearchTvResult from '../components/SearchTvResult';
import FilmographyScreen from '../screens/FilmographyScreen';
import { mapDeviceStateToProps, mapDeviceDispatchToProps } from './device/DeviceReducer';
import { mapLoginStateToProps, mapLoginDispatchToProps } from './login/LoginReducer';

const defaultState = {
    tmdbItems: new Array()
};

const addItem = (newState: any, item: any) => {
    const itemState = newState.tmdbItems.find((value: any, index: number, arr: any[]) => {
        const sameItem = (value.id === item.id
            && item.media_type
            && value.media_type === item.media_type);
        // Merge the new item with the old and return it.
        if (sameItem) {
            console.log('MERGE', item.media_type, item.id);
            arr[index] = Object.assign({}, value, item);
        }
        return sameItem;
    });
    if (!itemState) {
        console.log('INSERT', item.media_type, item.id);
        newState.tmdbItems.push(item);
    }
    return newState;
};

export function tmdbReducer(state: any = defaultState, action: any) {
    let newState = Object.assign({}, state);
    switch (action.type) {
        case ADD_ITEM:
            return addItem(state, action.item);
        case ADD_ITEMS:
            action.items.forEach((item: any) => {
                newState = addItem(newState, item);
            });
            return newState;
        case SET_ITEMS:
            newState.tmdbItems = action.items;
            return newState;
        default:
            return newState;
    }
}

export function mapTmdbStateToProps(state: any, ownProps: any) {
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
export function mapTmdbMovieStateToProps(state: any, ownProps: any) {
    return {
        ...(state.tmdb.tmdbItems.find((value: any) => {
            const result = (value.id === ownProps.id && value.media_type === 'movie')
            || (ownProps.navigation
                && value.id === ownProps.navigation.getParam('id')
                && ownProps.navigation.getParam('media_type') === 'movie');
            return result;
        })),
    };
}
export function mapTmdbPersonStateToProps(state: any, ownProps: any) {
    return {
        ...(state.tmdb.tmdbItems.find((value: any) => {
            const result = (value.id === ownProps.id && value.media_type === 'person')
            || (ownProps.navigation
                && value.id === ownProps.navigation.getParam('id')
                && ownProps.navigation.getParam('media_type') === 'person');
            return result;
        })),
    };
}
export function mapTmdbTvStateToProps(state: any, ownProps: any) {
    return {
        ...(state.tmdb.tmdbItems.find((value: any) => {
            const result = (value.id === ownProps.id && value.media_type === 'tv')
            || (ownProps.navigation
                && value.id === ownProps.navigation.getParam('id')
                && ownProps.navigation.getParam('media_type') === 'tv');
            return result;
        })),
    };
}

function withItemsToProps(Function: any) {
    return (state: any, ownProps: any) => {
        return Object.assign({}, Function(state, ownProps), {tmdbItems: state.tmdb.tmdbItems});
    };
}

export function mapTmdbDispatchToProps(dispatch: any, ownProps: any) {
    return {
        actions: bindActionCreators(TmdbActions as any, dispatch)
    };
}

const searchMovieResult = connect(mapTmdbMovieStateToProps, mapTmdbDispatchToProps)(enhanceWithMovieSomFunctions(SearchMovieResult));
export {searchMovieResult as SearchMovieResult};

const searchTvResult = connect(mapTmdbTvStateToProps, mapTmdbDispatchToProps)(enhanceWithMovieSomFunctions(SearchTvResult));
export {searchTvResult as SearchTvResult};

const searchPersonResult = connect(mapTmdbPersonStateToProps, mapTmdbDispatchToProps)(enhanceWithMovieSomFunctions(SearchPersonResult));
export {searchPersonResult as SearchPersonResult};

const movieDetailScreen = navigationParamsToProps(connect(mapTmdbMovieStateToProps, mapTmdbDispatchToProps)(enhanceWithMovieSomFunctions(MovieDetailScreen)));
export {movieDetailScreen as MovieDetailScreen};

const tvDetailScreen = navigationParamsToProps(connect(mapTmdbTvStateToProps, mapTmdbDispatchToProps)(enhanceWithMovieSomFunctions(TvDetailScreen)));
export {tvDetailScreen as TvDetailScreen};

const personDetailScreen = navigationParamsToProps(connect(mapTmdbPersonStateToProps, mapTmdbDispatchToProps)(enhanceWithMovieSomFunctions(PersonDetailScreen)));
export {personDetailScreen as PersonDetailScreen};

const searchScreen = connect(mapTmdbStateToProps, mapTmdbDispatchToProps)(SearchScreen);
export {searchScreen as SearchScreen};

const castAndCrewScreen = navigationParamsToProps(connect(mapTmdbStateToProps, mapTmdbDispatchToProps)(CastAndCrewScreen));
export {castAndCrewScreen as CastAndCrewScreen};

const filmographyScreen = navigationParamsToProps(connect(mapTmdbStateToProps, mapTmdbDispatchToProps)(FilmographyScreen));
export {filmographyScreen as FilmographyScreen};

function mapMovieStateToProps(state: any, ownProps: any) {
    return {
        ...(mapTmdbMovieStateToProps(state, ownProps)),
        ...(mapDeviceStateToProps(state, ownProps)),
        ...(mapLoginStateToProps(state, ownProps)),
    };
}
function mapDispatchToProps(dispatch: any, ownProps: any) {
    return {
        ...(mapTmdbDispatchToProps(dispatch, ownProps)),
        ...(mapDeviceDispatchToProps(dispatch, ownProps)),
        ...(mapLoginDispatchToProps(dispatch, ownProps)),
    };
}

const searchMovieResult2 = connect(mapMovieStateToProps, mapDispatchToProps)(enhanceWithMovieSomFunctions(SearchMovieResult));
export {searchMovieResult2 as SearchMovieResult2};
