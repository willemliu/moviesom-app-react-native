export const ADD_SEARCH_ITEM = 'ADD_SEARCH_ITEM';
export const ADD_SEARCH_ITEMS = 'ADD_SEARCH_ITEMS';
export const SET_SEARCH_ITEMS = 'SET_SEARCH_ITEMS';

export function addSearchItem(item: any) {
    return { type: ADD_SEARCH_ITEM, item };
}

export function addSearchItems(items: any[]) {
    return { type: ADD_SEARCH_ITEMS, items };
}

export function setSearchItems(items: any[]) {
    return { type: SET_SEARCH_ITEMS, items };
}
