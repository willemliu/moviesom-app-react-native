import React from 'react';
import { StyleSheet, Image, Text, View, AsyncStorage } from 'react-native';
import { NavigationActions } from 'react-navigation';
import {textStyle, viewStyle} from "../styles/Styles";

export default class SignUpScreen extends React.Component<any> {
    static navigationOptions = {
        title: 'Sign up',
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
                <Text onPress={this.login} style={textStyle.button}>Sign up</Text>
            </View>
        );
    }
}
