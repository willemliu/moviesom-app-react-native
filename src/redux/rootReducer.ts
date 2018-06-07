import { combineReducers } from 'redux';
import { collectionReducer as collection } from './collection/CollectionReducer';
import { deviceReducer as device } from './device/DeviceReducer';
import { tmdbReducer as tmdb } from './TmdbReducer';
import { searchReducer as search } from './search/SearchReducer';
import { loginReducer as login } from './login/LoginReducer';
import { newsReducer as news } from './news/NewsReducer';

/**
 * Combine individual reducers to one root reducer to be used by Redux.
 */
const rootReducer = combineReducers({
    collection,
    device,
    login,
    news,
    tmdb,
    search
});

const baseProperties = ['id', 'title', 'name', 'overview',
    'homepage', 'imdb_id', 'media_type', 'navigation'
];

export const anonymizeItems = (items: any[]): any[any] => {
    const newItems = [...items];
    newItems.forEach((item: any, idx: number, arr: any[]) => {
        const newItem: any = {};
        Object.keys(item).forEach((key: string) => {
            if (baseProperties.indexOf(key) > -1) {
                newItem[key] = item[key];
            }
        });
        arr[idx] = newItem;
    });
    return newItems;
};

export { rootReducer };
