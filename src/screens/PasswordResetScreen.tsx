import React from 'react';
import { StyleSheet, Image, Text, TextInput, View } from 'react-native';
import {textStyle, viewStyle, textInputStyle, movieSomColor} from "../styles/Styles";
import KeyboardSpacer from 'react-native-keyboard-spacer';

export default class PasswordResetScreen extends React.Component<any> {
    static navigationOptions = {
        title: 'Reset password',
    };

    render() {
        return (
            <View style={viewStyle.view}>
                <View style={viewStyle.formView}>
                    <TextInput
                        accessibilityLabel='E-mail address'
                        style={textInputStyle.textInput}
                        onChangeText={(email) => { this.setState({email}); }}
                        placeholder='E-mail'
                        autoCorrect={false}
                        clearButtonMode='always'
                        keyboardType='email-address'
                        underlineColorAndroid={movieSomColor}
                    />
                    <Text onPress={() => this.props.navigation.goBack()} style={textStyle.button}>Reset password</Text>
                </View>
                <KeyboardSpacer/>
            </View>
        );
    }
}
