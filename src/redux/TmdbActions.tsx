export const ADD_ITEM = 'ADD_MOVIE';
export const SET_ITEMS = 'SET_MOVIES';

export function addItem(item: any) {
    return { type: ADD_ITEM, item };
}

export function setItems(items: any[]) {
    return { type: SET_ITEMS, items };
}
