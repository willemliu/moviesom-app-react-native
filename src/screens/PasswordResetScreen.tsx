import React from 'react';
import {Text, TextInput, View} from 'react-native';
import {viewStyle, textInputStyle, movieSomColor, textStyle} from "../styles/Styles";
import TouchTextButton from '../components/TouchTextButton';
import {sendResetPasswordMail} from "../moviesom/MovieSom";

export default class PasswordResetScreen extends React.PureComponent<any, any> {
    static navigationOptions = {
        title: 'Reset password'
    };

    state: any = {
        mailSent: false
    };

    resetPassword = () => {
        this.setState({mailSent: true});
        sendResetPasswordMail(this.state.email);
    }

    render() {
        return (
            <View style={viewStyle.view}>
                {this.state.mailSent ?
                    <View style={viewStyle.view}>
                        <Text style={textStyle.loginReason}>Within a few moments you'll receive an e-mail with instructions on how to reset your e-mail.</Text>
                        <TouchTextButton style={{margin: 5}} onPress={() => this.props.navigation.goBack()}>Back</TouchTextButton>
                    </View>
                    : <View style={viewStyle.formView}>
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
                        <TouchTextButton style={{margin: 5}} onPress={this.resetPassword}>Reset password</TouchTextButton>
                    </View>
                }
            </View>
        );
    }
}
