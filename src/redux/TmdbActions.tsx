export const ADD_ITEM = 'ADD_MOVIE';
export const SET_ITEMS = 'SET_MOVIES';

export function addItem(item: any) {
    console.log(ADD_ITEM, item.id);
    return { type: ADD_ITEM, item };
}

export function setItems(items: any[]) {
    console.log(SET_ITEMS, items.length);
    return { type: SET_ITEMS, items };
}
