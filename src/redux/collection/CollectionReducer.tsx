import * as CollectionActions from './CollectionActions';
import { bindActionCreators } from 'redux';
import { ADD_COLLECTION_ITEM, ADD_COLLECTION_ITEMS, SET_COLLECTION_ITEMS, SET_COLLECTION_PAGE, SET_COLLECTION_TOTAL_PAGES } from './CollectionActions';
import { anonymizeItems } from '../rootReducer';

const defaultState = {
    collectionItems: []
};

const addCollectionItem = (newState: any, item: any) => {
    const itemState = newState.collectionItems.find((value: any, index: number, arr: any[]) => {
        const sameItem = (value.id === item.id && value.media_type === item.media_type);
        if (sameItem) {
            arr[index] = {...value, ...item};
        }
        return sameItem;
    });
    if (!itemState) {
        newState.collectionItems.push(item);
    }
    return newState;
};

export function collectionReducer(state: any = defaultState, action: any) {
    let newState = {...state};
    switch (action.type) {
        case ADD_COLLECTION_ITEM:
            return addCollectionItem(newState, action.item);
        case ADD_COLLECTION_ITEMS:
            action.items.forEach((item: any) => {
                newState = addCollectionItem(newState, item);
            });
            return newState;
        case SET_COLLECTION_ITEMS:
            newState.collectionItems = action.items;
            return newState;
        case SET_COLLECTION_PAGE:
            newState.page = action.page;
            return newState;
        case SET_COLLECTION_TOTAL_PAGES:
            newState.totalPages = action.totalPages;
            return newState;
        case "LOGOUT":
            return {collectionItems: anonymizeItems(newState.collectionItems)};
       default:
            return newState;
    }
}

export function mapCollectionStateToProps(state: any, ownProps: any) {
    return {
        ...(state.collection.collectionItems.find((value: any) => {
            let result = false;
            if (ownProps.navigation) {
                result = (ownProps.navigation.getParam('id') === value.id && ownProps.navigation.getParam('media_type') === value.media_type) ||
                (value.id === ownProps.id && value.media_type === ownProps.media_type);
            } else {
                result = (value.id === ownProps.id);
            }
            return result;
        })),
        page: state.collection.page,
        totalPages: state.collection.totalPages,
        collectionItems: state.collection.collectionItems,
    };
}

export function mapCollectionDispatchToProps(dispatch: any, ownProps: any) {
    return {
        collectionActions: bindActionCreators(CollectionActions as any, dispatch)
    };
}
