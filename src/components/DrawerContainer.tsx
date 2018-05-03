import React from 'react';
import { Text, View, AsyncStorage } from 'react-native';
import { NavigationActions } from 'react-navigation';
import {textStyle, viewStyle} from "../styles/Styles";

export default class DrawerContainer extends React.Component<any, any> {
    props: any;
    state: any;

    constructor(props: any) {
        super(props);
        this.state = {
            loggedIn: this.props.navigation.getParam('loggedIn', null)
        };
        console.log('DrawerContainer constructor state', this.props.navigation.getParam('loggedIn', null));
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

        console.log('logOut', await AsyncStorage.getItem('loggedIn'));
    }

    render() {
        const { navigation } = this.props;
        console.log('render loggedIn', this.state.loggedIn);
        return (
            <View style={viewStyle.drawer}>
                <Text
                    onPress={() => navigation.navigate('Home')}
                    style={textStyle.button}>
                        Home
                </Text>
                {this.state.loggedIn ? null : <Text
                    onPress={() => navigation.navigate('Login')}
                    style={textStyle.button}>
                        Login
                </Text>}
                {this.state.loggedIn ? null : <Text
                    onPress={() => navigation.navigate('SignUp')}
                    style={textStyle.button}>
                        Sign up
                </Text>}
                {this.state.loggedIn ? <Text
                    onPress={this.logOut}
                    style={textStyle.button}>
                        Logout
                </Text> : null}
                <Text
                    onPress={() => navigation.navigate('About', {name: 'Willem Liu'})}
                    style={textStyle.button}>
                        About
                </Text>
            </View>
        );
    }
}
