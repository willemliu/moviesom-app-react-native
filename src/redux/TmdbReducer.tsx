import * as TmdbActions from './TmdbActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ADD_ITEM, SET_ITEMS } from './TmdbActions';
import SearchMovieResult from '../components/SearchMovieResult';
import MovieDetailScreen from '../screens/MovieDetailScreen';
import SearchScreen from '../screens/SearchScreen';

const defaultState = {
    items: new Array()
};

export function tmdbReducer(state: any = defaultState, action: any) {
    const newState = Object.assign({}, state);
    switch (action.type) {
        case ADD_ITEM:
            const itemState = newState.items.find((value: any, index: number, arr: any[]) => {
                const sameItem = value.id === action.item.id;
                if (sameItem) {
                    arr[index] = Object.assign({}, value, action.item);
                }
                return sameItem;
            });
            if (!itemState) {
                newState.items.push(action.item);
            }
            return newState;
        case SET_ITEMS:
            newState.items = action.items;
            return newState;
        default:
            return newState;
    }
}

function mapItemStateToProps(state: any, ownProps: any) {
    return {
        ...(state.tmdb.items.find((value: any) => {
            let result = false;
            if (ownProps.navigation) {
                result = (ownProps.navigation.getParam('id') === value.id) || (value.id === ownProps.id);
            } else {
                result = (value.id === ownProps.id);
            }
            return result;
        }))
    };
}

function withItems(Function: any) {
    return (state: any, ownProps: any) => {
        return Object.assign({}, Function(state, ownProps), {items: state.tmdb.items});
    };
}

function mapTmdbDispatchToProps(dispatch: any, ownProps: any) {
    return {
        actions: bindActionCreators(TmdbActions as any, dispatch)
    };
}

const searchMovieResult = connect(mapItemStateToProps, mapTmdbDispatchToProps)(SearchMovieResult);
export {searchMovieResult as SearchMovieResult};

const movieDetailScreen = connect(mapItemStateToProps, mapTmdbDispatchToProps)(MovieDetailScreen);
export {movieDetailScreen as MovieDetailScreen};

const searchScreen = connect(withItems(mapItemStateToProps), mapTmdbDispatchToProps)(SearchScreen);
export {searchScreen as SearchScreen};
