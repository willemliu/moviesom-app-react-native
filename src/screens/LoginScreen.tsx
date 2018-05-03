import React from 'react';
import { StyleSheet, Image, Text, View, AsyncStorage } from 'react-native';
import { NavigationActions } from 'react-navigation';
import {textStyle, viewStyle} from "../styles/Styles";

export default class LoginScreen extends React.Component<any> {
    static navigationOptions = {
        title: 'Login',
        drawerIcon: () => (
            <Image
                source={{uri: `https://dummyimage.com/60x60/000/fff.jpg&text=3`}}
                style={{width: 30, height: 30, borderRadius: 15}}
            />
        ),
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
                <Text onPress={this.login} style={textStyle.button}>Login</Text>
                <Text onPress={() => this.props.navigation.navigate('PasswordReset')} style={textStyle.smallLink}>Forgot password</Text>
            </View>
        );
    }
}
