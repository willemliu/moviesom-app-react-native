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
    }

    logOut = async () => {
        this.props.loginActions.logout();
        this.props.navigation.goBack();
    }

    render() {
        const { navigation } = this.props;
        return (
            <View style={viewStyle.drawer}>
                <TouchTextButton style={{marginBottom: 10}} onPress={() => requestAnimationFrame(() => navigation.navigate('Home'))}>Home</TouchTextButton>

                {this.props.loggedIn ? null : (
                    <TouchTextButton style={{marginBottom: 10}} onPress={() => requestAnimationFrame(() => navigation.navigate('Login'))}>Login</TouchTextButton>
                )}

                {this.props.loggedIn ? null : (
                    <TouchTextButton style={{marginBottom: 10}} onPress={() => requestAnimationFrame(() => navigation.navigate('SignUp'))}>Sign up</TouchTextButton>
                )}

                {this.props.loggedIn ? (
                    <TouchTextButton style={{marginBottom: 10}} onPress={this.logOut}>Log out</TouchTextButton>
                ) : null}

                <TouchTextButton
                    style={{marginBottom: 10}}
                    onPress={() => requestAnimationFrame(() => Linking.openURL('exp://exp.host/@willem_liu/react-native-ts?tmdbMovieId=500'))}
                >Link external</TouchTextButton>
                <TouchTextButton
                    style={{marginBottom: 10}}
                    onPress={() => requestAnimationFrame(() => this.props.navigation.navigate('Donate', {url: 'https://app.moviesom.com'}))}
                >MovieSom</TouchTextButton>

                <TouchTextButton
                    style={{marginBottom: 10}}
                    onPress={() => requestAnimationFrame(() => navigation.navigate('About', {name: 'Willem Liu'}))}
                >About</TouchTextButton>

                <TouchTextButton
                    style={{marginBottom: 10}}
                    onPress={async () => await AsyncStorage.removeItem('store')}
                >Clear DB</TouchTextButton>

            </View>
        );
    }
}
