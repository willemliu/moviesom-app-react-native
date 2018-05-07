import { combineReducers } from 'redux';
import { movieReducer as movies } from './MoviesReducer';

/**
 * Combine individual reducers to one root reducer to be used by Redux.
 */
const rootReducer = combineReducers({
    movies
});

export { rootReducer };
