import React from 'react';
import { StyleSheet, Image, Text, View, AsyncStorage } from 'react-native';
import { NavigationActions } from 'react-navigation';
import {textStyle, viewStyle} from "../styles/Styles";

export default class SignUpScreen extends React.Component<any> {
    static navigationOptions = {
        title: 'Sign up',
        drawerIcon: () => (
            <Image
                source={{uri: `https://dummyimage.com/60x60/000/fff.jpg&text=4`}}
                style={{width: 30, height: 30, borderRadius: 15}}
            />
        ),
    };

    login = async () => {
        await AsyncStorage.setItem('loggedIn', '1');

        console.log('login', await AsyncStorage.getItem('loggedIn'));
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
