import React from 'react';
import { get, getBackdropUrl, getProfileUrl, getPosterUrl } from '../tmdb/TMDb';
import { post } from '../moviesom/MovieSom';
import { GetUsersMoviesSettings } from '../interfaces/Movie';
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

export const getUserMoviesSettings = async (items: any[]) => {
    const payload: GetUsersMoviesSettings = {
        token: await AsyncStorage.getItem('loginToken'),
        movie_tmdb_ids: []
    };
    payload.movie_tmdb_ids = items.filter((item) => {
        return item.media_type === 'movie';
    });
    const response = await post(`getUserMoviesSettings`, '', JSON.stringify(payload)).then((data) => data.json());
    console.log('getUserMoviesSettings', response.getUserMoviesSettings.status, response.getUserMoviesSettings.status === 200 ? response.getUserMoviesSettings.message.length : response.getUserMoviesSettings);
    if (response.getUserMoviesSettings.status === 200 && response.getUserMoviesSettings && response.getUserMoviesSettings.message) {
        response.getUserMoviesSettings.message.forEach((value: any, idx: number, arr: any[]) => {
            arr[idx].media_type = 'movie';
        });
    }
    return response.getUserMoviesSettings.message;
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
                />
            );
        }
    }
);
