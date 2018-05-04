import React from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';
import {textStyle, viewStyle} from "../styles/Styles";

export default class PasswordResetScreen extends React.Component<any> {
    static navigationOptions = {
        title: 'Reset password',
    };

    render() {
        return (
            <View style={viewStyle.view}>
                <Text onPress={() => this.props.navigation.goBack()} style={textStyle.button}>Reset password</Text>
            </View>
        );
    }
}
