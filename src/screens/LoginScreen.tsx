import React from 'react';
import { StyleSheet, Image, Text, View, AsyncStorage, TextInput, TouchableNativeFeedback, Platform } from 'react-native';
import { NavigationActions } from 'react-navigation';
import {textStyle, viewStyle, textInputStyle, movieSomColor} from "../styles/Styles";
import KeyboardSpacer from 'react-native-keyboard-spacer';
import TouchTextButton from '../components/TouchTextButton';

export default class LoginScreen extends React.Component<any> {
    static navigationOptions = {
        title: 'Login',
    };

    login = async () => {
        this.props.actions.login();
        this.props.navigation.goBack();
    }

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
                    <TextInput
                        accessibilityLabel='Password'
                        style={textInputStyle.textInput}
                        onChangeText={(password) => { this.setState({password}); }}
                        placeholder='Password'
                        autoCorrect={false}
                        clearButtonMode='always'
                        secureTextEntry={true}
                        underlineColorAndroid={movieSomColor}
                    />
                    <TouchTextButton style={{margin: 5}} onPress={this.login}>Login</TouchTextButton>

                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10}}>
                        <Text onPress={() => this.props.navigation.navigate('SignUp')} style={textStyle.smallLink}>Sign up</Text>
                        <Text style={textStyle.smallLink}> | </Text>
                        <Text onPress={() => this.props.navigation.navigate('PasswordReset')} style={textStyle.smallLink}>Forgot password</Text>
                    </View>
                </View>
                <KeyboardSpacer/>
            </View>
        );
    }
}
