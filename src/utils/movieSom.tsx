import React from 'react';
import { AsyncStorage, Share } from "react-native";

export const formatDuration = (minutes: number) => {
    const hours = minutes / 60;
    const mins = minutes % 60;
    return `${hours.toFixed(0)}h ${mins.toFixed(0)}m`;
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
