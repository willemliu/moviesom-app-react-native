import React from 'react';
import { StyleSheet, Image, Text, View, AsyncStorage, TextInput } from 'react-native';
import { NavigationActions } from 'react-navigation';
import {textStyle, viewStyle, textInputStyle, movieSomColor} from "../styles/Styles";
import KeyboardSpacer from 'react-native-keyboard-spacer';

export default class SignUpScreen extends React.Component<any, any> {
    static navigationOptions = {
        title: 'Sign up',
    };

    state: any = {
        passwordsMatch: true
    };

    login = async () => {
        await AsyncStorage.setItem('loggedIn', '1');

        const resetAction = NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'Drawer' })],
        });
        this.props.navigation.dispatch(resetAction);
    }

    checkPasswords = (password: string) => {
        console.log(this.state.password === password, this.state.password, password);
        if (password.length && this.state.password !== password) {
            this.setState({
                passwordsMatch: false
            });
        } else {
            this.setState({
                passwordsMatch: true
            });
        }
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
                    <TextInput
                        accessibilityLabel='Repeat password'
                        style={textInputStyle.textInput}
                        onChangeText={this.checkPasswords}
                        placeholder='Repeat password'
                        autoCorrect={false}
                        clearButtonMode='always'
                        secureTextEntry={true}
                        underlineColorAndroid={this.state.passwordsMatch ? movieSomColor : '#f00'}
                    />
                    <Text onPress={this.login} style={textStyle.button}>Sign up</Text>
                </View>
                <KeyboardSpacer/>
            </View>
        );
    }
}
