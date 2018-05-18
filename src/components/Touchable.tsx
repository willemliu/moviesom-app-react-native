import React from 'react';
import { Platform, TouchableNativeFeedback, GestureResponderEvent, TouchableHighlight } from 'react-native';

export interface Props {
    background?: any;
    handleOnPress?: (event: GestureResponderEvent) => void;
    children?: null|undefined|JSX.Element|JSX.Element[];
}

export default class Touchable extends React.PureComponent<any, any> {
    render() {
        if (Platform.OS === 'android') {
            return (
                <TouchableNativeFeedback
                    onPress={this.props.onPress}
                    background={TouchableNativeFeedback.SelectableBackground()}
                >{this.props.children}</TouchableNativeFeedback>
            );
        } else {
            return (
                <TouchableHighlight onPress={this.props.onPress}>{this.props.children}</TouchableHighlight>
            );
        }
    }
}
