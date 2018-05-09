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

function mapItemStateToProps(state: any, ownProps: any) {
    return {
        ...(state.tmdb.tmdbItems.find((value: any) => {
            let result = false;
            // When a very specific case.
            if (ownProps.navigation && ownProps.searchItems) {
                result = (ownProps.navigation.getParam('id') === value.id
                        && ownProps.navigation.getParam('media_type')
                        && ownProps.navigation.getParam('media_type') === value.media_type)
                    || (value.id === ownProps.id && value.media_type && value.media_type === ownProps.media_type);
            } else {
                result = (value.id === ownProps.id && value.media_type === ownProps.media_type);
            }
            return result;
        }))
    };
}

function withItems(Function: any) {
    return (state: any, ownProps: any) => {
        return Object.assign({}, Function(state, ownProps), {tmdbItems: state.tmdb.tmdbItems});
    };
}

function mapTmdbDispatchToProps(dispatch: any, ownProps: any) {
    return {
        actions: bindActionCreators(TmdbActions as any, dispatch)
    };
}

const searchMovieResult = connect(mapItemStateToProps, mapTmdbDispatchToProps)(SearchMovieResult);
export {searchMovieResult as SearchMovieResult};

const searchPersonResult = connect(mapItemStateToProps, mapTmdbDispatchToProps)(SearchPersonResult);
export {searchPersonResult as SearchPersonResult};

const movieDetailScreen = connect(mapItemStateToProps, mapTmdbDispatchToProps)(MovieDetailScreen);
export {movieDetailScreen as MovieDetailScreen};

const tvDetailScreen = connect(mapItemStateToProps, mapTmdbDispatchToProps)(TvDetailScreen);
export {tvDetailScreen as TvDetailScreen};

const personDetailScreen = connect(mapItemStateToProps, mapTmdbDispatchToProps)(PersonDetailScreen);
export {personDetailScreen as PersonDetailScreen};

const searchScreen = connect(withItems(mapItemStateToProps), mapTmdbDispatchToProps)(SearchScreen);
export {searchScreen as SearchScreen};

const castAndCrewScreen = connect(withItems(mapItemStateToProps), mapTmdbDispatchToProps)(CastAndCrewScreen);
export {castAndCrewScreen as CastAndCrewScreen};
