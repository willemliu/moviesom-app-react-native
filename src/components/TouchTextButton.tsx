import React from 'react';
import { TouchableNativeFeedback, Platform, Text, GestureResponderEvent, TextStyle, StyleProp, View } from 'react-native';
import { textStyle } from '../styles/Styles';
import { NavigationRoute, NavigationScreenProp } from 'react-navigation';

export interface Props {
    onPress: (event: GestureResponderEvent) => void;
    style?: StyleProp<TextStyle>;
    children?: any;
}

export default class TouchTextButton extends React.Component<Props, any> {
    render() {
        return (
            <TouchableNativeFeedback
                onPress={this.props.onPress}
                background={TouchableNativeFeedback.SelectableBackground()}
                useForeground={true}
            >
                <View><Text style={this.props.style}>{this.props.children}</Text></View>
            </TouchableNativeFeedback>
        );
    }
}
