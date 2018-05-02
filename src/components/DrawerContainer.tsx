import React from 'react';
import { StyleSheet, Text, View, Image, AsyncStorage } from 'react-native';
import { NavigationActions } from 'react-navigation';

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
            <View style={styles.container}>
                <Text
                    onPress={() => navigation.navigate('Home')}
                    style={styles.textButton}>
                        Home
                </Text>
                {this.state.loggedIn ? null : <Text
                    onPress={() => navigation.navigate('Login')}
                    style={styles.textButton}>
                        Login
                </Text>}
                {this.state.loggedIn ? null : <Text
                    onPress={() => navigation.navigate('SignUp')}
                    style={styles.textButton}>
                        Sign up
                </Text>}
                {this.state.loggedIn ? <Text
                    onPress={this.logOut}
                    style={styles.textButton}>
                        Logout
                </Text> : null}
                <Text
                    onPress={() => navigation.navigate('About')}
                    style={styles.textButton}>
                        About
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
    paddingHorizontal: 20
  },
  textButton: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#008CBA',
    padding: 15,
    margin: 5,
    borderRadius: 2,
    borderColor: '#008CBA',
    borderWidth: 1,
    textAlign: 'center'
  }
});
