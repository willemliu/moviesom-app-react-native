import * as CollectionActions from './CollectionActions';
import { bindActionCreators } from 'redux';
import { ADD_COLLECTION_ITEM, ADD_COLLECTION_ITEMS, SET_COLLECTION_ITEMS, SET_COLLECTION_PAGE, SET_COLLECTION_TOTAL_PAGES } from './CollectionActions';
import { anonymizeItems } from '../rootReducer';
import {SET_COLLECTION_FILTERS} from "./CollectionActions";

const defaultState = {
    filterConnection: '',
    watchedFilter: 'true',
    bluRayFilter: 'false',
    dvdFilter: 'false',
    digitalFilter: 'false',
    otherFilter: 'false',
    lendOutFilter: 'false',
    noteFilter: 'false',
    spoilerFilter: 'false',
    sort: '',
    allFilter: 'false',
    page: 1,
    totalPages: 1,
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
        case SET_COLLECTION_FILTERS:
            newState.filterConnection = action.filters.filter_connection;
            newState.allFilter = action.filters.all_filter;
            newState.bluRayFilter = action.filters.blu_ray_filter;
            newState.dvdFilter = action.filters.dvd_filter;
            newState.digitalFilter = action.filters.digital_filter;
            newState.otherFilter = action.filters.other_filter;
            newState.lendOutFilter = action.filters.lend_out_filter;
            newState.noteFilter = action.filters.note_filter;
            newState.sort = action.filters.sort;
            newState.spoiler_filter = action.filters.spoiler_filter;
            newState.watched_filter = action.filters.watched_filter;
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
        filterConnection: state.collection.filterConnection,
        watchedFilter: state.collection.watchedFilter,
        bluRayFilter: state.collection.bluRayFilter,
        dvdFilter: state.collection.dvdFilter,
        digitalFilter: state.collection.digitalFilter,
        otherFilter: state.collection.otherFilter,
        lendOutFilter: state.collection.lendOutFilter,
        noteFilter: state.collection.noteFilter,
        spoilerFilter: state.collection.spoilerFilter,
        sort: state.collection.sort,
        allFilter: state.collection.allFilter,
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
