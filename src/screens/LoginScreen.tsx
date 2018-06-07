import React from 'react';
import {Text, View, TextInput, ActivityIndicator} from 'react-native';
import {textStyle, viewStyle, textInputStyle, movieSomColor} from "../styles/Styles";
import TouchTextButton from '../components/TouchTextButton';
import {login} from "../moviesom/MovieSom";

interface State {
    email: string;
    password: string;
    loading?: boolean;
}

export default class LoginScreen extends React.PureComponent<any, State> {
    static navigationOptions = {
        title: 'Login',
    };

    state: State = {
        email: '',
        password: '',
        loading: false
    };

    login = async () => {
        this.setState({loading: true});
        const loginResult = await login(this.state.email, this.state.password);
        this.setState({loading: false});
        if (loginResult.login.status === 200) {
            this.props.loginActions.login(loginResult.login.loginToken);
            this.props.navigation.goBack();
        } else {
            this.props.loginActions.logout();
            alert('Could not login. Please try again. Note that the password is case-sensitive.');
        }
    }

    render() {
        return (
            <View style={viewStyle.view}>
                <View style={viewStyle.formView}>
                    {this.props.loginReason ? <Text style={textStyle.loginReason}>{this.props.loginReason}</Text> : null}
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
                    {this.state.loading ? null : <TouchTextButton style={{margin: 5}} onPress={this.login}>Login</TouchTextButton>}

                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10}}>
                        <Text onPress={() => this.props.navigation.push('SignUp')} style={textStyle.smallLink}>Sign up</Text>
                        <Text style={textStyle.smallLink}> | </Text>
                        <Text onPress={() => this.props.navigation.push('PasswordReset')} style={textStyle.smallLink}>Forgot password</Text>
                    </View>
                </View>
                {this.state.loading ? <ActivityIndicator size='large' color='#009688' style={viewStyle.activityIndicator}/> : null}
            </View>
        );
    }
}
