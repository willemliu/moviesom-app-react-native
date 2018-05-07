import { combineReducers } from 'redux';
import { tmdbReducer as tmdb } from './TmdbReducer';

/**
 * Combine individual reducers to one root reducer to be used by Redux.
 */
const rootReducer = combineReducers({
    tmdb
});

export { rootReducer };
