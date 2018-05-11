import React from 'react';
import { AsyncStorage, Share } from "react-native";
import SearchTvResult from '../components/SearchTvResult';

export const formatDuration = (minutes: number) => {
    const hours = (minutes / 60).toFixed(0);
    const mins = (minutes % 60).toFixed(0);
    return `${parseInt(hours, 10) ? `${hours}h ` : ''}${mins}m`;
};

export const withMovieSomFunctions = (Component: any) => (
    class extends React.Component <any, any> {
        static navigationOptions = Component.navigationOptions;

        render() {
            return (
                <Component
                    {...this.props}
                    handleOnPress={() => this.props.handleOnPress(this.props)}
                    formatDuration={formatDuration}
                />
            );
        }
    }
);
