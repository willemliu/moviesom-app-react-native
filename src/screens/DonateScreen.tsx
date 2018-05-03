import React from 'react';
import { WebView, View, Text } from 'react-native';
import {textStyle, viewStyle} from "../styles/Styles";

export default class DonateScreen extends React.Component<any> {
    static navigationOptions = {
        title: 'Donate',
    };

    render() {
        return (
            <WebView
                source={{uri: 'https://www.moviesom.com/donate.html'}}
                startInLoadingState={true}
                style={viewStyle.view}
            />
        );
    }
}
