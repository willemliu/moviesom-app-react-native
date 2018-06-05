import { mapTmdbMovieStateToProps, mapTmdbTvStateToProps, mapTmdbEpisodeStateToProps, mapTmdbPersonStateToProps, mapTmdbStateToProps, mapTmdbDispatchToProps } from "./TmdbReducer";
import { mapDeviceStateToProps, mapDeviceDispatchToProps } from './device/DeviceReducer';
import { mapLoginStateToProps, mapLoginDispatchToProps } from './login/LoginReducer';
import { mapSearchStateToProps, mapSearchDispatchToProps } from './search/SearchReducer';
import { mapCollectionStateToProps, mapCollectionDispatchToProps } from './collection/CollectionReducer';
import { mapNewsStateToProps, mapNewsDispatchToProps } from './news/NewsReducer';

/**
 * STATE 2 PROPS MAPPERS
 */

/**
 * Map multiple Redux store movie states to props.
 * @param state
 * @param ownProps
 */
export function mapMovieStateToProps(state: any, ownProps: any) {
    return {
        ...(mapTmdbMovieStateToProps(state, ownProps)),
        ...(mapDeviceStateToProps(state, ownProps)),
        ...(mapLoginStateToProps(state, ownProps)),
    };
}
/**
 * Map multiple Redux store tv states to props.
 * @param state
 * @param ownProps
 */
export function mapTvStateToProps(state: any, ownProps: any) {
    return {
        ...(mapTmdbTvStateToProps(state, ownProps)),
        ...(mapDeviceStateToProps(state, ownProps)),
        ...(mapLoginStateToProps(state, ownProps)),
    };
}
/**
 * Map multiple Redux store episode states to props.
 * @param state
 * @param ownProps
 */
export function mapEpisodeStateToProps(state: any, ownProps: any) {
    return {
        ...(mapTmdbEpisodeStateToProps(state, ownProps)),
        ...(mapDeviceStateToProps(state, ownProps)),
        ...(mapLoginStateToProps(state, ownProps)),
    };
}
/**
 * Map multiple Redux store person states to props.
 * @param state
 * @param ownProps
 */
export function mapPersonStateToProps(state: any, ownProps: any) {
    return {
        ...(mapTmdbPersonStateToProps(state, ownProps)),
        ...(mapDeviceStateToProps(state, ownProps)),
        ...(mapLoginStateToProps(state, ownProps)),
    };
}
/**
 * Map multiple Redux store states to props.
 * @param state
 * @param ownProps
 */
export function mapAllStateToProps(state: any, ownProps: any) {
    return {
        ...(mapTmdbStateToProps(state, ownProps)),
        ...(mapDeviceStateToProps(state, ownProps)),
        ...(mapLoginStateToProps(state, ownProps)),
    };
}
/**
 * Map multiple Redux store search states to props.
 * @param state
 * @param ownProps
 */
export function mapAllSearchStateToProps(state: any, ownProps: any) {
    return {
        ...(mapAllStateToProps(state, ownProps)),
        ...(mapSearchStateToProps(state, ownProps)),
    };
}
/**
 * Map multiple Redux store search states to props.
 * @param state
 * @param ownProps
 */
export function mapAllCollectionStateToProps(state: any, ownProps: any) {
    return {
        ...(mapAllStateToProps(state, ownProps)),
        ...(mapCollectionStateToProps(state, ownProps)),
    };
}
/**
 * Map multiple Redux store news states to props.
 * @param state
 * @param ownProps
 */
export function mapAllNewsStateToProps(state: any, ownProps: any) {
    return {
        ...(mapAllStateToProps(state, ownProps)),
        ...(mapNewsStateToProps(state, ownProps)),
    };
}
/**
 * Map multiple Redux store login states to props.
 * @param state
 * @param ownProps
 */
export function mapAllLoginStateToProps(state: any, ownProps: any) {
    return {
        ...(mapAllStateToProps(state, ownProps)),
        ...(mapLoginStateToProps(state, ownProps)),
    };
}

/**
 * DISPATCHERS
 */

/**
 * Map multiple Redux dispatchers to props.
 * @param dispatch
 * @param ownProps
 */
export function mapAllDispatchToProps(dispatch: any, ownProps: any) {
    return {
        ...(mapTmdbDispatchToProps(dispatch, ownProps)),
        ...(mapDeviceDispatchToProps(dispatch, ownProps)),
        ...(mapLoginDispatchToProps(dispatch, ownProps)),
    };
}
/**
 * Map multiple Redux dispatchers to props.
 * @param dispatch
 * @param ownProps
 */
export function mapAllSearchDispatchToProps(dispatch: any, ownProps: any) {
    return {
        ...(mapAllDispatchToProps(dispatch, ownProps)),
        ...(mapSearchDispatchToProps(dispatch, ownProps)),
    };
}
/**
 * Map multiple Redux dispatchers to props.
 * @param dispatch
 * @param ownProps
 */
export function mapAllCollectionDispatchToProps(dispatch: any, ownProps: any) {
    return {
        ...(mapAllDispatchToProps(dispatch, ownProps)),
        ...(mapCollectionDispatchToProps(dispatch, ownProps)),
    };
}
/**
 * Map multiple Redux dispatchers to props.
 * @param dispatch
 * @param ownProps
 */
export function mapAllNewsDispatchToProps(dispatch: any, ownProps: any) {
    return {
        ...(mapAllDispatchToProps(dispatch, ownProps)),
        ...(mapNewsDispatchToProps(dispatch, ownProps)),
    };
}
/**
 * Map multiple Redux dispatchers to props.
 * @param dispatch
 * @param ownProps
 */
export function mapAllLoginDispatchToProps(dispatch: any, ownProps: any) {
    return {
        ...(mapAllDispatchToProps(dispatch, ownProps)),
        ...(mapLoginDispatchToProps(dispatch, ownProps)),
    };
}
