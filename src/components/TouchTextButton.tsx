import React from 'react';
import { TouchableNativeFeedback, Platform, Text, GestureResponderEvent, TextStyle, StyleProp, View } from 'react-native';
import { textStyle, touchTextButtonStyle } from '../styles/Styles';
import { NavigationRoute, NavigationScreenProp } from 'react-navigation';

export interface Props {
    onPress: (event: GestureResponderEvent) => void;
    style?: StyleProp<TextStyle>;
    children?: any;
    buttonStyle?: StyleProp<TextStyle>;
}

export default class TouchTextButton extends React.Component<Props, any> {
    render() {
        return (
            <TouchableNativeFeedback
                onPress={this.props.onPress}
                background={TouchableNativeFeedback.SelectableBackground()}
            >
                <View style={this.props.buttonStyle ? this.props.buttonStyle : touchTextButtonStyle.view}>
                    <Text style={this.props.style ? this.props.style : touchTextButtonStyle.text}>{this.props.children}</Text>
                </View>
            </TouchableNativeFeedback>
        );
    }
}
