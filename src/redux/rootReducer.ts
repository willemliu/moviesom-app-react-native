import * as TmdbActions from './TmdbActions';
import * as LoginActions from './login/LoginActions';
import * as DeviceActions from './device/DeviceActions';
import { combineReducers } from 'redux';
import { deviceReducer as device, mapDeviceStateToProps, mapDeviceDispatchToProps } from './device/DeviceReducer';
import { tmdbReducer as tmdb, mapTmdbDispatchToProps, mapTmdbMovieStateToProps } from './TmdbReducer';
import { searchReducer as search } from './search/SearchReducer';
import { loginReducer as login, mapLoginStateToProps, mapLoginDispatchToProps } from './login/LoginReducer';
import { enhanceWithMovieSomFunctions } from '../utils/movieSom';
import SearchMovieResult from '../components/SearchMovieResult';
import { connect } from 'react-redux';

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
