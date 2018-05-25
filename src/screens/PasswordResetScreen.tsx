import React from 'react';
import { TextInput, View } from 'react-native';
import {viewStyle, textInputStyle, movieSomColor} from "../styles/Styles";
import TouchTextButton from '../components/TouchTextButton';

export default class PasswordResetScreen extends React.PureComponent<any, any> {
    static navigationOptions = {
        title: 'Reset password',
    };

    resetPassword = () => {
        this.props.navigation.goBack();
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
                    <TouchTextButton style={{margin: 5}} onPress={this.resetPassword}>Reset password</TouchTextButton>
                </View>
            </View>
        );
    }
}
