import {GetUsersMoviesList} from "../../screens/CollectionScreen";

export const ADD_COLLECTION_ITEM = 'ADD_COLLECTION_ITEM';
export const ADD_COLLECTION_ITEMS = 'ADD_COLLECTION_ITEMS';
export const SET_COLLECTION_ITEMS = 'SET_COLLECTION_ITEMS';
export const SET_COLLECTION_FILTERS = 'SET_COLLECTION_FILTERS';
export const SET_COLLECTION_PAGE = 'SET_COLLECTION_PAGE';
export const SET_COLLECTION_TOTAL_PAGES = 'SET_COLLECTION_TOTAL_PAGES';

export function addCollectionItem(item: any) {
    return { type: ADD_COLLECTION_ITEM, item };
}

export function addCollectionItems(items: any[]) {
    return { type: ADD_COLLECTION_ITEMS, items };
}

export function setCollectionItems(items: any[]) {
    return { type: SET_COLLECTION_ITEMS, items };
}

export function setCollectionPage(page: number) {
    return { type: SET_COLLECTION_PAGE, page };
}

export function setCollectionFilters(filters: GetUsersMoviesList) {
    return { type: SET_COLLECTION_FILTERS, filters };
}

export function setCollectionTotalPages(totalPages: number) {
    return { type: SET_COLLECTION_TOTAL_PAGES, totalPages };
}
