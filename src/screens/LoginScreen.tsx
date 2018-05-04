import React from 'react';
import { StyleSheet, Image, Text, View, AsyncStorage, TextInput } from 'react-native';
import { NavigationActions } from 'react-navigation';
import {textStyle, viewStyle, textInputStyle, movieSomColor} from "../styles/Styles";
import KeyboardSpacer from 'react-native-keyboard-spacer';

export default class LoginScreen extends React.Component<any> {
    static navigationOptions = {
        title: 'Login',
    };

    login = async () => {
        await AsyncStorage.setItem('loggedIn', '1');

        const resetAction = NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'Drawer' })],
        });
        this.props.navigation.dispatch(resetAction);

    }

    render() {
        return (
            <View style={viewStyle.view}>
                <View style={{flex: 1, flexDirection: 'column', width: '80%', maxWidth: 400, justifyContent: 'center'}}>
                    <TextInput
                        accessibilityLabel='E-mail address'
                        style={textInputStyle.textInput}
                        onChangeText={(searchText) => { this.setState({searchText}); }}
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
                </View>
                <Text onPress={this.login} style={textStyle.button}>Login</Text>
                <Text onPress={() => this.props.navigation.navigate('PasswordReset')} style={textStyle.smallLink}>Forgot password</Text>
                <KeyboardSpacer/>
            </View>
        );
    }
}
