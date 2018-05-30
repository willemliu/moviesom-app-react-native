export const ADD_ITEM = 'ADD_ITEM';
export const ADD_ITEMS = 'ADD_ITEMS';
export const SET_ITEMS = 'SET_ITEMS';
export const ADD_ITEM_NEWS = 'ADD_ITEM_NEWS';
export const SET_ITEM_NEWS = 'SET_ITEM_NEWS';

export function addItem(item: any) {
    return { type: ADD_ITEM, item };
}

export function addItems(items: any[]) {
    return { type: ADD_ITEMS, items };
}

export function setItems(items: any[]) {
    return { type: SET_ITEMS, items };
}

export function addItemNews(item: any, newsItems: any[]) {
    return { type: ADD_ITEM_NEWS, item, newsItems };
}

export function setItemNews(item: any, newsItems: any[]) {
    return { type: SET_ITEM_NEWS, item, newsItems };
}
