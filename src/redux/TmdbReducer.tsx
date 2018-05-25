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
import { navigationParamsToProps } from '../utils/navigation';
import { enhanceWithMovieSomFunctions } from '../utils/movieSom';
import SearchTvResult from '../components/SearchTvResult';
import FilmographyScreen from '../screens/FilmographyScreen';
import { mapDeviceStateToProps, mapDeviceDispatchToProps } from './device/DeviceReducer';
import { mapLoginStateToProps, mapLoginDispatchToProps } from './login/LoginReducer';
import { mapSearchStateToProps, mapSearchDispatchToProps } from './search/SearchReducer';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import PicturesScreen from '../screens/PicturesScreen';
import SearchPictureResult from '../components/SearchPictureResult';
import SettingsScreen from '../screens/SettingsScreen';
import SeasonsScreen from '../screens/SeasonsScreen';
import SearchSeasonResult from '../components/SearchSeasonResult';
import SearchEpisodeResult from '../components/SearchEpisodeResult';
import EpisodesScreen from '../screens/EpisodesScreen';
import SeasonDetailScreen from '../screens/SeasonDetailScreen';
import EpisodeDetailScreen from '../screens/EpisodeDetailScreen';

const defaultState = {
    tmdbItems: new Array()
};

const insertOrMergeItem = (newState: any, item: any) => {
    const itemState = newState.tmdbItems.find((value: any, index: number, arr: any[]) => {
        const sameItem = (value.id === item.id
            && item.media_type
            && value.media_type === item.media_type);
        // Merge the new item with the old and return it.
        if (sameItem) {
            console.log('MERGE', item.media_type, item.id);
            arr[index] = {...value, ...item};
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
    let newState = {...state};
    switch (action.type) {
        case ADD_ITEM:
            return insertOrMergeItem(state, action.item);
        case ADD_ITEMS:
            action.items.forEach((item: any) => {
                newState = insertOrMergeItem(newState, item);
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
        return {...(Function(state, ownProps)), tmdbItems: state.tmdb.tmdbItems};
    };
}

export function mapTmdbDispatchToProps(dispatch: any, ownProps: any) {
    return {
        actions: bindActionCreators(TmdbActions as any, dispatch)
    };
}

const searchMovieResult = connect(mapMovieStateToProps, mapAllDispatchToProps)(enhanceWithMovieSomFunctions(SearchMovieResult));
export {searchMovieResult as SearchMovieResult};

const searchTvResult = connect(mapTvStateToProps, mapAllDispatchToProps)(enhanceWithMovieSomFunctions(SearchTvResult));
export {searchTvResult as SearchTvResult};

const searchSeasonResult = enhanceWithMovieSomFunctions(SearchSeasonResult);
export {searchSeasonResult as SearchSeasonResult};

const searchEpisodeResult = enhanceWithMovieSomFunctions(SearchEpisodeResult);
export {searchEpisodeResult as SearchEpisodeResult};

const searchPersonResult = connect(mapPersonStateToProps, mapAllDispatchToProps)(enhanceWithMovieSomFunctions(SearchPersonResult));
export {searchPersonResult as SearchPersonResult};

const searchPictureResult = connect(mapPersonStateToProps, mapAllDispatchToProps)(enhanceWithMovieSomFunctions(SearchPictureResult));
export {searchPictureResult as SearchPictureResult};

const movieDetailScreen = navigationParamsToProps(connect(mapMovieStateToProps, mapAllDispatchToProps)(enhanceWithMovieSomFunctions(MovieDetailScreen)));
export {movieDetailScreen as MovieDetailScreen};

const tvDetailScreen = navigationParamsToProps(connect(mapTvStateToProps, mapAllDispatchToProps)(enhanceWithMovieSomFunctions(TvDetailScreen)));
export {tvDetailScreen as TvDetailScreen};

const seasonDetailScreen = navigationParamsToProps(connect(mapTvStateToProps, mapAllDispatchToProps)(enhanceWithMovieSomFunctions(SeasonDetailScreen)));
export {seasonDetailScreen as SeasonDetailScreen};

const episodeDetailScreen = navigationParamsToProps(connect(mapTvStateToProps, mapAllDispatchToProps)(enhanceWithMovieSomFunctions(EpisodeDetailScreen)));
export {episodeDetailScreen as EpisodeDetailScreen};

const personDetailScreen = navigationParamsToProps(connect(mapPersonStateToProps, mapAllDispatchToProps)(enhanceWithMovieSomFunctions(PersonDetailScreen)));
export {personDetailScreen as PersonDetailScreen};

const castAndCrewScreen = navigationParamsToProps(connect(mapAllStateToProps, mapAllDispatchToProps)(CastAndCrewScreen));
export {castAndCrewScreen as CastAndCrewScreen};

const seasonsScreen = navigationParamsToProps(connect(mapAllStateToProps, mapAllDispatchToProps)(enhanceWithMovieSomFunctions(SeasonsScreen)));
export {seasonsScreen as SeasonsScreen};

const episodesScreen = navigationParamsToProps(connect(mapAllStateToProps, mapAllDispatchToProps)(enhanceWithMovieSomFunctions(EpisodesScreen)));
export {episodesScreen as EpisodesScreen};

const filmographyScreen = navigationParamsToProps(connect(mapAllStateToProps, mapAllDispatchToProps)(FilmographyScreen));
export {filmographyScreen as FilmographyScreen};

const picturesScreen = navigationParamsToProps(connect(mapAllStateToProps, mapAllDispatchToProps)(PicturesScreen));
export {picturesScreen as PicturesScreen};

/**
 * SEARCH
 */

const searchScreen = connect(mapAllSearchStateToProps, mapAllSearchDispatchToProps)(enhanceWithMovieSomFunctions(SearchScreen));
export {searchScreen as SearchScreen};

/**
 * SETTINGS
 */

const settingsScreen = connect(mapAllStateToProps, mapAllDispatchToProps)(SettingsScreen);
export {settingsScreen as SettingsScreen};

/**
 * LOGIN
 */

const loginScreen = connect(mapAllLoginStateToProps, mapAllLoginDispatchToProps)(LoginScreen);
export {loginScreen as LoginScreen};

const signUpScreen = connect(mapAllLoginStateToProps, mapAllLoginDispatchToProps)(SignUpScreen);
export {signUpScreen as SignUpScreen};

/**
 * STATE 2 PROPS MAPPERS
 */

/**
 * Map multiple Redux store movie states to props.
 * @param state
 * @param ownProps
 */
function mapMovieStateToProps(state: any, ownProps: any) {
    return {
        ...(mapTmdbMovieStateToProps(state, ownProps)),
        ...(mapDeviceStateToProps(state, ownProps)),
        ...(mapLoginStateToProps(state, ownProps)),
    };
}
/**
 * Map multiple Redux store tv states to props.
 * @param state
 * @param ownProps
 */
function mapTvStateToProps(state: any, ownProps: any) {
    return {
        ...(mapTmdbTvStateToProps(state, ownProps)),
        ...(mapDeviceStateToProps(state, ownProps)),
        ...(mapLoginStateToProps(state, ownProps)),
    };
}
/**
 * Map multiple Redux store person states to props.
 * @param state
 * @param ownProps
 */
function mapPersonStateToProps(state: any, ownProps: any) {
    return {
        ...(mapTmdbPersonStateToProps(state, ownProps)),
        ...(mapDeviceStateToProps(state, ownProps)),
        ...(mapLoginStateToProps(state, ownProps)),
    };
}
/**
 * Map multiple Redux store states to props.
 * @param state
 * @param ownProps
 */
function mapAllStateToProps(state: any, ownProps: any) {
    return {
        ...(mapTmdbStateToProps(state, ownProps)),
        ...(mapDeviceStateToProps(state, ownProps)),
        ...(mapLoginStateToProps(state, ownProps)),
    };
}
/**
 * Map multiple Redux store search states to props.
 * @param state
 * @param ownProps
 */
function mapAllSearchStateToProps(state: any, ownProps: any) {
    return {
        ...(mapAllStateToProps(state, ownProps)),
        ...(mapSearchStateToProps(state, ownProps)),
    };
}
/**
 * Map multiple Redux store login states to props.
 * @param state
 * @param ownProps
 */
function mapAllLoginStateToProps(state: any, ownProps: any) {
    return {
        ...(mapAllStateToProps(state, ownProps)),
        ...(mapLoginStateToProps(state, ownProps)),
    };
}

/**
 * DISPATCHERS
 */

/**
 * Map multiple Redux dispatchers to props.
 * @param dispatch
 * @param ownProps
 */
function mapAllDispatchToProps(dispatch: any, ownProps: any) {
    return {
        ...(mapTmdbDispatchToProps(dispatch, ownProps)),
        ...(mapDeviceDispatchToProps(dispatch, ownProps)),
        ...(mapLoginDispatchToProps(dispatch, ownProps)),
    };
}
/**
 * Map multiple Redux dispatchers to props.
 * @param dispatch
 * @param ownProps
 */
function mapAllSearchDispatchToProps(dispatch: any, ownProps: any) {
    return {
        ...(mapAllDispatchToProps(dispatch, ownProps)),
        ...(mapSearchDispatchToProps(dispatch, ownProps)),
    };
}
/**
 * Map multiple Redux dispatchers to props.
 * @param dispatch
 * @param ownProps
 */
function mapAllLoginDispatchToProps(dispatch: any, ownProps: any) {
    return {
        ...(mapAllDispatchToProps(dispatch, ownProps)),
        ...(mapLoginDispatchToProps(dispatch, ownProps)),
    };
}
