import React from 'react';
import { View, TextInput } from 'react-native';
import {viewStyle, textInputStyle, movieSomColor} from "../styles/Styles";
import TouchTextButton from '../components/TouchTextButton';
import {login} from "../moviesom/MovieSom";

export default class SignUpScreen extends React.Component<any, any> {
    static navigationOptions = {
        title: 'Sign up',
    };

    state: any = {
        passwordsMatch: true
    };

    login = async () => {
        const loginResult = await login(this.state.email, this.state.password);
        if (loginResult.login.status === 200) {
            this.props.loginActions.login(loginResult.login.loginToken);
            this.props.navigation.goBack();
        } else {
            this.props.loginActions.logout();
            alert('Could not login. Please try again. Note that the password is case-sensitive.');
        }
    }

    checkPasswords = (password: string) => {
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
                        onChangeText={(email: string) => { this.setState({email}); }}
                        placeholder='E-mail'
                        autoCorrect={false}
                        clearButtonMode='always'
                        keyboardType='email-address'
                        underlineColorAndroid={movieSomColor}
                    />
                    <TextInput
                        accessibilityLabel='Password'
                        style={textInputStyle.textInput}
                        onChangeText={(password: string) => { this.setState({password}); }}
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
                    <TouchTextButton style={{margin: 5}} onPress={this.login}>Sign up</TouchTextButton>
                </View>
            </View>
        );
    }
}
