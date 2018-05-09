export const ADD_ITEM = 'ADD_ITEM';
export const SET_ITEMS = 'SET_ITEMS';

export function addItem(item: any) {
    return { type: ADD_ITEM, item };
}

export function setItems(items: any[]) {
    return { type: SET_ITEMS, items };
}
