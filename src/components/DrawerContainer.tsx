import React from 'react';
import { View, AsyncStorage } from 'react-native';
import {viewStyle} from "../styles/Styles";
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
                <TouchTextButton style={{marginBottom: 10}} onPress={() => requestAnimationFrame(() => navigation.push('Home'))}>Home</TouchTextButton>

                {this.props.loggedIn ? null : (
                    <TouchTextButton style={{marginBottom: 10}} onPress={() => requestAnimationFrame(() => navigation.push('Login'))}>Login</TouchTextButton>
                )}

                {this.props.loggedIn ? null : (
                    <TouchTextButton style={{marginBottom: 10}} onPress={() => requestAnimationFrame(() => navigation.push('SignUp'))}>Sign up</TouchTextButton>
                )}

                {this.props.loggedIn ? (
                    <TouchTextButton style={{marginBottom: 10}} onPress={this.logOut}>Log out</TouchTextButton>
                ) : null}

                <TouchTextButton
                    style={{marginBottom: 10}}
                    onPress={() => requestAnimationFrame(() => navigation.push('About', {name: 'Willem Liu'}))}
                >About</TouchTextButton>

                <TouchTextButton
                    style={{marginBottom: 10}}
                    onPress={async () => await AsyncStorage.removeItem('store')}
                >Clear DB</TouchTextButton>

            </View>
        );
    }
}
