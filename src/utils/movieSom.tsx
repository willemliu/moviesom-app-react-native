import React from 'react';
import { get, getBackdropUrl, getProfileUrl, getPosterUrl } from '../tmdb/TMDb';
import { post } from '../moviesom/MovieSom';
import {GetUserEpisodeSettings, GetUserMoviesSettings, GetUserTvSettings} from '../interfaces/Movie';
import { AsyncStorage } from 'react-native';

/**
 * Formats given minutes into `(n)h (n)m` format.
 * I.e:
 * - 120 will return: `2h 0m`
 * - 149 will return: `2h 29m`
 * - 90 will return: `1h 30m`
 * @param {number} minutes
 * @returns {string}
 */
export const formatDuration = (minutes: number) => {
    const hours = Math.floor((minutes / 60)).toFixed(0);
    const mins = (minutes % 60).toFixed(0);
    return `${parseInt(hours, 10) ? `${hours}h ` : ''}${mins}m`;
};

/**
 * Retrieve User <-> movies settings.
 */
export const getUserMoviesSettings = async (items: any[], loginToken: string) => {
    const payload: GetUserMoviesSettings = {
        token: loginToken,
        movie_tmdb_ids: []
    };
    payload.movie_tmdb_ids = items.filter((item) => {
        return item.media_type === 'movie';
    });
    const response = await post(`getUserMoviesSettings`, '', JSON.stringify(payload)).then((data) => data.json());
    console.log(`getUserMoviesSettings status=${response.getUserMoviesSettings.status}`, response.getUserMoviesSettings.status === 200 ? response.getUserMoviesSettings.message.length : response.getUserMoviesSettings);
    console.log('token', payload.token);
    if (response.getUserMoviesSettings.status === 200 && response.getUserMoviesSettings && response.getUserMoviesSettings.message) {
        response.getUserMoviesSettings.message.forEach((value: any, idx: number, arr: any[]) => {
            // Swap ids because returned `id` is the MovieSom id and we want to use the `tmdb_id` as `id`.
            arr[idx].moviesom_id = parseInt(value.id, 10); // Parse to integer.
            arr[idx].id = parseInt(value.tmdb_id, 10); // Parse to integer.
            arr[idx].media_type = 'movie'; // Add a media_type because it doesn't have one.
            arr[idx].watched = parseInt(value.watched, 10); // Parse to integer.
            arr[idx].want_to_watch = parseInt(value.want_to_watch, 10); // Parse to integer.
        });
    }
    return response.getUserMoviesSettings.message;
};

/**
 * Retrieve User <-> tv settings.
 */
export const getUserTvSettings = async (items: any[], loginToken: string) => {
    const payload: GetUserTvSettings = {
        token: loginToken,
        tv_tmdb_ids: []
    };
    payload.tv_tmdb_ids = items.filter((item) => {
        return item.media_type === 'tv';
    });
    const response = await post(`getUserTvSettings`, '', JSON.stringify(payload)).then((data) => data.json());
    console.log(`getUserTvSettings status=${response.getUserTvSettings.status}`, response.getUserTvSettings.status === 200 ? response.getUserTvSettings.message.length : response.getUserTvSettings);
    console.log('token', payload.token);
    if (response.getUserTvSettings.status === 200 && response.getUserTvSettings && response.getUserTvSettings.message) {
        response.getUserTvSettings.message.forEach((value: any, idx: number, arr: any[]) => {
            // Swap ids because returned `id` is the MovieSom id and we want to use the `tmdb_id` as `id`.
            arr[idx].moviesom_id = parseInt(value.id, 10); // Parse to integer.
            arr[idx].id = parseInt(value.tmdb_id, 10); // Parse to integer.
            arr[idx].media_type = 'tv'; // Add a media_type because it doesn't have one.
            arr[idx].want_to_watch = parseInt(value.want_to_watch, 10); // Parse to integer.
        });
    }
    return response.getUserTvSettings.message;
};

/**
 * Retrieve User <-> episode settings.
 */
export const getUserEpisodeSettings = async (items: any[], loginToken: string) => {
    const payload: GetUserEpisodeSettings = {
        token: loginToken,
        tv_episode_tmdb_ids: []
    };
    payload.tv_episode_tmdb_ids = items.filter((item) => {
        return item.media_type === 'episode';
    });
    const response = await post(`getUserTvEpisodesSettings`, '', JSON.stringify(payload)).then((data) => data.json());
    console.log(`getUserTvEpisodesSettings status=${response.getUserTvEpisodesSettings.status}`, response.getUserTvEpisodesSettings.status === 200 ? response.getUserTvEpisodesSettings.message.length : response.getUserTvEpisodesSettings);
    console.log('token', payload.token);
    if (response.getUserTvEpisodesSettings.status === 200 && response.getUserTvEpisodesSettings && response.getUserTvEpisodesSettings.message) {
        response.getUserTvEpisodesSettings.message.forEach((value: any, idx: number, arr: any[]) => {
            // Swap ids because returned `id` is the MovieSom id and we want to use the `tmdb_id` as `id`.
            arr[idx].moviesom_id = parseInt(value.id, 10); // Parse to integer.
            arr[idx].moviesom_tv_id = parseInt(value.tv_id, 10); // Parse to integer.
            arr[idx].id = parseInt(value.episode_tmdb_id, 10); // Parse to integer.
            arr[idx].tv_id = parseInt(value.tmdb_tv_id, 10); // Parse to integer.
            arr[idx].media_type = 'episode'; // Add a media_type because it doesn't have one.
            arr[idx].watched = parseInt(value.watched, 10); // Parse to integer.
            arr[idx].want_to_watch = parseInt(value.want_to_watch, 10); // Parse to integer.
        });
    }
    return response.getUserTvEpisodesSettings.message;
};

/**
 * Enhance a React Component class with some extra functions.
 *
 * @param Component
 * @returns {{navigationOptions: any; componentDidMount?(): void; shouldComponentUpdate?(nextProps: Readonly<any>, nextState: Readonly<any>, nextContext: any): boolean; componentWillUnmount?(): void; componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void; getSnapshotBeforeUpdate?(prevProps: Readonly<any>, prevState: Readonly<any>): any; componentDidUpdate?(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void; componentWillMount?(): void; UNSAFE_componentWillMount?(): void; componentWillReceiveProps?(nextProps: Readonly<any>, nextContext: any): void; UNSAFE_componentWillReceiveProps?(nextProps: Readonly<any>, nextContext: any): void; componentWillUpdate?(nextProps: Readonly<any>, nextState: Readonly<any>, nextContext: any): void; UNSAFE_componentWillUpdate?(nextProps: Readonly<any>, nextState: Readonly<any>, nextContext: any): void; new(props: any, context?: any): {render: {(): any; (): React.ReactNode}; componentDidMount?(): void; shouldComponentUpdate?(nextProps: Readonly<any>, nextState: Readonly<any>, nextContext: any): boolean; componentWillUnmount?(): void; componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void; getSnapshotBeforeUpdate?(prevProps: Readonly<any>, prevState: Readonly<any>): any; componentDidUpdate?(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void; componentWillMount?(): void; UNSAFE_componentWillMount?(): void; componentWillReceiveProps?(nextProps: Readonly<any>, nextContext: any): void; UNSAFE_componentWillReceiveProps?(nextProps: Readonly<any>, nextContext: any): void; componentWillUpdate?(nextProps: Readonly<any>, nextState: Readonly<any>, nextContext: any): void; UNSAFE_componentWillUpdate?(nextProps: Readonly<any>, nextState: Readonly<any>, nextContext: any): void; setState(state: any, callback?: () => void): void; forceUpdate(callBack?: () => void): void; props: Readonly<{children?: React.ReactNode}> & Readonly<any>; state: Readonly<any>; context: any; refs: {[p: string]: React.ReactInstance}}; prototype: {render: {(): any; (): React.ReactNode}; componentDidMount?(): void; shouldComponentUpdate?(nextProps: Readonly<any>, nextState: Readonly<any>, nextContext: any): boolean; componentWillUnmount?(): void; componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void; getSnapshotBeforeUpdate?(prevProps: Readonly<any>, prevState: Readonly<any>): any; componentDidUpdate?(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void; componentWillMount?(): void; UNSAFE_componentWillMount?(): void; componentWillReceiveProps?(nextProps: Readonly<any>, nextContext: any): void; UNSAFE_componentWillReceiveProps?(nextProps: Readonly<any>, nextContext: any): void; componentWillUpdate?(nextProps: Readonly<any>, nextState: Readonly<any>, nextContext: any): void; UNSAFE_componentWillUpdate?(nextProps: Readonly<any>, nextState: Readonly<any>, nextContext: any): void; setState(state: any, callback?: () => void): void; forceUpdate(callBack?: () => void): void; props: Readonly<{children?: React.ReactNode}> & Readonly<any>; state: Readonly<any>; context: any; refs: {[p: string]: React.ReactInstance}}}}
 */
export const enhanceWithMovieSomFunctions = (Component: any) => (
    class extends React.Component <any, any> {
        static navigationOptions = Component.navigationOptions;

        render() {
            return (
                <Component
                    {...this.props}
                    handleOnPress={() => this.props.handleOnPress(this.props)}
                    formatDuration={formatDuration}
                    get={get}
                    getBackdropUrl={getBackdropUrl}
                    getProfileUrl={getProfileUrl}
                    getPosterUrl={getPosterUrl}
                    getUserMoviesSettings={getUserMoviesSettings}
                    getUserTvSettings={getUserTvSettings}
                    getUserEpisodeSettings={getUserEpisodeSettings}
                />
            );
        }
    }
);
