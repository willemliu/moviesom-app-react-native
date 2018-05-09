import React from 'react';
import { Text, View, AsyncStorage, Linking, TouchableNativeFeedback, Platform } from 'react-native';
import { NavigationActions } from 'react-navigation';
import {textStyle, viewStyle} from "../styles/Styles";
import TouchTextButton from './TouchTextButton';

export default class DrawerContainer extends React.Component<any, any> {
    props: any;
    state: any;

    constructor(props: any) {
        super(props);
        this.state = {
            loggedIn: this.props.navigation.getParam('loggedIn', null)
        };
        this.checkLogin();
    }

    checkLogin = async () => {
        this.setState({
            loggedIn: await AsyncStorage.getItem('loggedIn')
        });
    }

    logOut = async () => {
        await AsyncStorage.removeItem('loggedIn');
        this.setState({
            loggedIn: null
        });

        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Drawer' })],
        });
        this.props.navigation.dispatch(resetAction);
    }

    render() {
        const { navigation } = this.props;
        return (
            <View style={viewStyle.drawer}>
                <TouchTextButton style={{marginBottom: 10}} onPress={() => navigation.navigate('Home')}>Home</TouchTextButton>

                {this.state.loggedIn ? null : (
                    <TouchTextButton style={{marginBottom: 10}} onPress={() => navigation.navigate('Login')}>Login</TouchTextButton>
                )}

                {this.state.loggedIn ? null : (
                    <TouchTextButton style={{marginBottom: 10}} onPress={() => navigation.navigate('SignUp')}>Sign up</TouchTextButton>
                )}

                {this.state.loggedIn ? (
                    <TouchTextButton style={{marginBottom: 10}} onPress={this.logOut}>Log out</TouchTextButton>
                ) : null}

                <TouchTextButton
                    style={{marginBottom: 10}}
                    onPress={() => Linking.openURL('exp://exp.host/@willem_liu/react-native-ts?tmdbMovieId=500')}
                >Link external</TouchTextButton>
                <TouchTextButton
                    style={{marginBottom: 10}}
                    onPress={() => this.props.navigation.navigate('Donate', {url: 'https://app.moviesom.com'})}
                >MovieSom</TouchTextButton>

                <TouchTextButton
                    style={{marginBottom: 10}}
                    onPress={() => navigation.navigate('About', {name: 'Willem Liu'})}
                >About</TouchTextButton>

                <TouchTextButton
                    style={{marginBottom: 10}}
                    onPress={async () => await AsyncStorage.removeItem('store')}
                >Clear DB</TouchTextButton>

            </View>
        );
    }
}
