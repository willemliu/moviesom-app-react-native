export const ADD_NEWS_ITEM = 'ADD_NEWS_ITEM';
export const ADD_NEWS_ITEMS = 'ADD_NEWS_ITEMS';
export const SET_NEWS_ITEMS = 'SET_NEWS_ITEMS';
export const SET_NEWS_OFFSET = 'SET_NEWS_OFFSET';
export const SET_NEWS_TOTAL_NEWS = 'SET_NEWS_TOTAL_NEWS';

export function addNewsItem(item: any) {
    return { type: ADD_NEWS_ITEM, item };
}

export function addNewsItems(items: any[]) {
    return { type: ADD_NEWS_ITEMS, items };
}

export function setNewsItems(items: any[]) {
    return { type: SET_NEWS_ITEMS, items };
}

export function setNewsOffset(offset: number) {
    return { type: SET_NEWS_OFFSET, offset };
}

export function setNewsTotalNews(totalNews: number) {
    return { type: SET_NEWS_TOTAL_NEWS, totalNews };
}
