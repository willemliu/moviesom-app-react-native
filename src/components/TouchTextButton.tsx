import React from 'react';
import { Text, GestureResponderEvent, TextStyle, StyleProp, View } from 'react-native';
import { touchTextButtonStyle } from '../styles/Styles';
import Touchable from './Touchable';

export interface Props {
    onPress: (event: GestureResponderEvent) => void;
    style?: StyleProp<TextStyle>;
    children?: any;
    textStyle?: StyleProp<TextStyle>;
}

export default class TouchTextButton extends React.PureComponent<Props, any> {
    render() {
        return (
            <Touchable onPress={this.props.onPress}>
                <View style={[touchTextButtonStyle.view, this.props.style]}>
                    <Text style={[touchTextButtonStyle.text, this.props.textStyle]}>{this.props.children}</Text>
                </View>
            </Touchable>
        );
    }
}
