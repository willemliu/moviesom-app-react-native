import * as SearchActions from './SearchActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ADD_SEARCH_ITEM, SET_SEARCH_ITEMS, ADD_SEARCH_ITEMS } from './SearchActions';
import { SearchScreen } from '../TmdbReducer';

const defaultState = {
    searchItems: new Array()
};

const addSearchItem = (newState: any, item: any) => {
    const itemState = newState.searchItems.find((value: any, index: number, arr: any[]) => {
        const sameItem = (value.id === item.id && value.media_type === item.media_type);
        if (sameItem) {
            console.log('MERGE search item', item.media_type, item.id);
            arr[index] = Object.assign({}, value, item);
        }
        return sameItem;
    });
    if (!itemState) {
        console.log('INSERT search item', item.media_type, item.id);
        newState.searchItems.push(item);
    }
    return newState;
};

export function searchReducer(state: any = defaultState, action: any) {
    let newState = Object.assign({}, state);
    switch (action.type) {
        case ADD_SEARCH_ITEM:
            return addSearchItem(newState, action.item);
        case ADD_SEARCH_ITEMS:
            action.items.forEach((item: any) => {
                newState = addSearchItem(newState, item);
            });
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
                result = (ownProps.navigation.getParam('id') === value.id && ownProps.navigation.getParam('media_type') === value.media_type) ||
                (value.id === ownProps.id && value.media_type === ownProps.media_type);
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
