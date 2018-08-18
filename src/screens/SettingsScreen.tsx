import React from 'react';
import {View, AsyncStorage} from 'react-native';
import {viewStyle} from "../styles/Styles";
import TouchTextButton from '../components/TouchTextButton';

export default class SettingsScreen extends React.PureComponent<any, any> {
    static navigationOptions = {
        title: 'Settings',
    };

    props: any;
    state: any = {
        loading: false
    };

    constructor(props: any) {
        super(props);
    }

    logOut = () => {
        this.props.loginActions.logout();
    }

    render() {
        const { navigation } = this.props;
        return (
            <View style={viewStyle.drawer}>
                {this.props.loggedIn ? null : (
                    <TouchTextButton style={{marginBottom: 10}} onPress={() => requestAnimationFrame(() => navigation.push('Login'))}>Login</TouchTextButton>
                )}

                {this.props.loggedIn ? null : (
                    <TouchTextButton style={{marginBottom: 10}} onPress={() => requestAnimationFrame(() => navigation.push('SignUp'))}>Sign up</TouchTextButton>
                )}

                {this.props.loggedIn ? (
                    <TouchTextButton style={{marginBottom: 10}} onPress={() => requestAnimationFrame(() => navigation.push('Profile'))}>Profile</TouchTextButton>
                ) : null}

                {this.props.loggedIn ? (
                    <TouchTextButton style={{marginBottom: 10}} onPress={() => requestAnimationFrame(() => navigation.push('Profile'))}>Movie buddies</TouchTextButton>
                ) : null}

                {this.props.loggedIn ? (
                    <TouchTextButton style={{marginBottom: 10}} onPress={() => requestAnimationFrame(() => navigation.push('Profile'))}>Stats</TouchTextButton>
                ) : null}

                {this.props.loggedIn ? (
                    <TouchTextButton style={{marginBottom: 10}} onPress={() => requestAnimationFrame(() => navigation.push('Profile'))}>Rankings</TouchTextButton>
                ) : null}

                <TouchTextButton
                    style={{marginBottom: 10}}
                    onPress={() => requestAnimationFrame(() => navigation.push('About', {name: 'Willem Liu'}))}
                >About</TouchTextButton>

                {this.props.loggedIn ? (
                    <TouchTextButton style={{marginBottom: 10}} onPress={() => requestAnimationFrame(this.logOut)}>Log out</TouchTextButton>
                ) : null}

                <TouchTextButton
                    style={{marginBottom: 10}}
                    onPress={async () => {
                        await AsyncStorage.removeItem('store');
                        alert('Redux store cleared');
                    }}
                >Clear data store</TouchTextButton>
            </View>
        );
    }
}
