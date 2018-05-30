import * as NewsActions from './NewsActions';
import { bindActionCreators } from 'redux';
import {ADD_NEWS_ITEM, ADD_NEWS_ITEMS, SET_NEWS_ITEMS, SET_NEWS_OFFSET, SET_NEWS_TOTAL_NEWS} from './NewsActions';

const defaultState = {
    newsItems: new Array()
};

const addNewsItem = (newState: any, item: any) => {
    const itemState = newState.newsItems.find((value: any, index: number, arr: any[]) => {
        const sameItem = value.id === item.id;
        if (sameItem) {
            // console.log('MERGE news item', item.id);
            arr[index] = {...value, ...item};
        }
        return sameItem;
    });
    if (!itemState) {
        // console.log('INSERT news item', item.id);
        newState.newsItems.push(item);
    }
    return newState;
};

export function newsReducer(state: any = defaultState, action: any) {
    let newState = {...state};
    switch (action.type) {
        case ADD_NEWS_ITEM:
            // console.log('ADD news item');
            return addNewsItem(newState, action.item);
        case ADD_NEWS_ITEMS:
            // console.log('ADD news items');
            action.items.forEach((item: any) => {
                newState = addNewsItem(newState, item);
            });
            return newState;
        case SET_NEWS_ITEMS:
            // console.log('REPLACE news items');
            newState.newsItems = action.items;
            return newState;
        case SET_NEWS_OFFSET:
            newState.offset = action.offset;
            return newState;
        case SET_NEWS_TOTAL_NEWS:
            newState.totalNews = action.totalNews;
            return newState;
       default:
            return newState;
    }
}

export function mapNewsStateToProps(state: any, ownProps: any) {
    return {
        ...(state.news.newsItems.find((value: any) => {
            let result = false;
            if (ownProps.navigation) {
                result = (ownProps.navigation.getParam('id') === value.id) || (value.id === ownProps.id);
            } else {
                result = (value.id === ownProps.id);
            }
            return result;
        })),
        offset: state.news.offset,
        totalNews: state.news.totalNews,
        newsItems: state.news.newsItems,
    };
}

export function mapNewsDispatchToProps(dispatch: any, ownProps: any) {
    return {
        newsActions: bindActionCreators(NewsActions as any, dispatch)
    };
}
