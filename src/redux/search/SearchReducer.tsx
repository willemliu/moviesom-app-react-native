import * as SearchActions from './SearchActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ADD_SEARCH_ITEM, SET_SEARCH_ITEMS } from './SearchActions';
import { SearchScreen } from '../TmdbReducer';

const defaultState = {
    searchItems: new Array()
};

export function searchReducer(state: any = defaultState, action: any) {
    const newState = Object.assign({}, state);
    switch (action.type) {
        case ADD_SEARCH_ITEM:
            const itemState = newState.searchItems.find((value: any, index: number, arr: any[]) => {
                const sameItem = value.id === action.item.id;
                if (sameItem) {
                    arr[index] = Object.assign({}, value, action.item);
                }
                return sameItem;
            });
            if (!itemState) {
                newState.searchItems.push(action.item);
            }
            return newState;
        case SET_SEARCH_ITEMS:
            newState.searchItems = action.items;
            return newState;
        default:
            return newState;
    }
}

function mapSearchStateToProps(state: any, ownProps: any) {
    return {
        ...(state.search.searchItems.find((value: any) => {
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
        return Object.assign({}, Function(state, ownProps), {searchItems: state.search.searchItems});
    };
}

function mapSearchDispatchToProps(dispatch: any, ownProps: any) {
    return {
        searchActions: bindActionCreators(SearchActions as any, dispatch)
    };
}

const searchScreen = connect(withItems(mapSearchStateToProps), mapSearchDispatchToProps)(SearchScreen);
export {searchScreen as SearchScreen};
