import React from 'react';
import { AsyncStorage, Share, Image } from "react-native";
import SearchTvResult from '../components/SearchTvResult';
import { get, getBackdropUrl, getProfileUrl, getPosterUrl } from '../tmdb/TMDb';

export const formatDuration = (minutes: number) => {
    const hours = (minutes / 60).toFixed(0);
    const mins = (minutes % 60).toFixed(0);
    return `${parseInt(hours, 10) ? `${hours}h ` : ''}${mins}m`;
};

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
                />
            );
        }
    }
);
