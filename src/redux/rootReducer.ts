import { combineReducers } from 'redux';
import { deviceReducer as device } from './device/DeviceReducer';
import { tmdbReducer as tmdb } from './TmdbReducer';
import { searchReducer as search } from './search/SearchReducer';
import { loginReducer as login } from './login/LoginReducer';

/**
 * Combine individual reducers to one root reducer to be used by Redux.
 */
const rootReducer = combineReducers({
    device,
    tmdb,
    search,
    login
});

export { rootReducer };
