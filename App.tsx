import { Image, Text, View, Modal, Linking, AsyncStorage, NetInfo, ConnectionInfo } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import AboutScreen from './src/screens/AboutScreen';
import { LoginScreen, SignUpScreen } from './src/redux/TmdbReducer';
import PasswordResetScreen from './src/screens/PasswordResetScreen';
import React from 'react';
import {headerStyle, viewStyle} from "./src/styles/Styles";
import PersonDetailsScreen from './src/screens/PersonDetailsScreen';
import {getConfig as getTmdbConfig} from './src/tmdb/TMDb';
import {getConfig as getMovieSomConfig, loginWithToken} from './src/moviesom/MovieSom';
import MovieDetailsScreen from './src/screens/MovieDetailsScreen';
import TvDetailsScreen from './src/screens/TvDetailsScreen';
import TouchTextButton from './src/components/TouchTextButton';
import { createStore, Store } from 'redux';
import {Provider} from "react-redux";
import { rootReducer } from './src/redux/rootReducer';
import WebScreen from './src/screens/WebScreen';
import { LOGIN } from './src/redux/login/LoginActions';
import { DEVICE_ONLINE } from './src/redux/device/DeviceActions';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import HomeScreen from './src/screens/HomeScreen';

console.disableYellowBox = true;

export default class App extends React.Component<any> {

    state: any = {
        modalVisible: false,
        online: false,
    };

    constructor(props: any) {
        super(props);
        this.netInfo();
        Linking.addEventListener('url', this.handleUrl);
        this.checkInitialUrl();
        this.getConfig();
        this.createStore();
    }

    getConfig = async () => {
        await getTmdbConfig();
        await getMovieSomConfig();
    }

    netInfo = () => {
        NetInfo.addEventListener('connectionChange', this.checkOnline as any);
    }

    checkOnline = (connectionInfo: ConnectionInfo) => {
        switch (connectionInfo.type) {
            case 'none':
            case 'NONE':
            case 'unknown':
            case 'UNKNOWN':
            case 'DUMMY':
                this.setState({
                    online: false,
                    networkMessage: 'Offline'
                });
                return false;
            default:
                this.setState({
                    online: true,
                    networkMessage: 'Online'
                });
                return true;
        }
    }

    checkLoggedIn = async (store: Store) => {
        const loggedIn = await AsyncStorage.getItem('loggedIn');
        const loginToken = await AsyncStorage.getItem('loginToken');
        if (loggedIn) {
            const loginResult = await loginWithToken(loginToken);
            if (loginResult.login.status === 200) {
                store.dispatch({type: LOGIN, loginToken: loginResult.login.loginToken});
            } else {
                this.props.loginActions.logout();
            }
        }
    }

    createStore = async () => {
        // await AsyncStorage.removeItem('store');
        const preloadedState = JSON.parse(await AsyncStorage.getItem('store'));
        const connectionInfo = await NetInfo.getConnectionInfo();
        let store: Store;
        if (preloadedState) {
            store = createStore(rootReducer, preloadedState);
            console.log('Load Redux store');
        } else {
            console.log('Create Redux store');
            store = createStore(rootReducer);
        }

        // Subscribe to store changes and save them locally on the device for
        // future sessions.
        store.subscribe(async () => {
            await AsyncStorage.setItem('store', JSON.stringify(store.getState()));
        });
        this.checkLoggedIn(store).catch((e: any) => console.log(e));
        if (this.checkOnline(connectionInfo)) {
            store.dispatch({type: DEVICE_ONLINE});
        }
        this.setState({store});
    }

    checkInitialUrl = async () => {
        try {
            const url = await Linking.getInitialURL();
            if (url) { this.handleUrl({url}); }
        } catch (e) {
            console.error(e);
        }
    }

    handleUrl = ({url}: any) => {
        this.setState({
            // modalVisible: true,
            url
        });
    }

    hideModal = () => {
        this.setState({
            modalVisible: false
        });
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.modalVisible}
                onRequestClose={this.hideModal}>
                    <View style={viewStyle.view}>
                        <View>
                            <Text>URL: {this.state.url}</Text>
                            <TouchTextButton onPress={this.hideModal}>Close</TouchTextButton>
                        </View>
                    </View>
                </Modal>
                {this.state.store ?
                <Provider store={this.state.store}>
                    <StackNav/>
                </Provider> : null}
                {!this.state.online ?
                    <Text style={{flex: 0, textAlign: 'center', backgroundColor: 'red', color: 'white'}}>{this.state.networkMessage}</Text> :
                    <Text style={{flex: 0, textAlign: 'center', backgroundColor: 'green', color: 'white'}}>{this.state.networkMessage}</Text>
                }
                <KeyboardSpacer/>
            </View>
        );
    }
}

const StackNav = createStackNavigator({
    Home: {
        screen: HomeScreen,
    },
    About: {
        screen: AboutScreen,
    },
    MovieDetails: {
        screen: MovieDetailsScreen,
    },
    TvDetails: {
        screen: TvDetailsScreen,
    },
    PersonDetails: {
        screen: PersonDetailsScreen,
    },
    Donate: {
        screen: WebScreen,
        navigationOptions: {
            title: 'Donate'
        }
    },
    Login: {
        screen: LoginScreen,
    },
    PasswordReset: {
        screen: PasswordResetScreen,
    },
    SignUp: {
        screen: SignUpScreen,
    },
    Web: {
        screen: WebScreen,
    },
}, {
    navigationOptions: () => ({
        title: 'MovieSom',
        headerTitle: <View style={headerStyle.view}><Image style={headerStyle.image} resizeMode="center" source={require('./img/title.png')}/></View>,
        headerStyle: {
            backgroundColor: '#008CBA',
        },
        headerTitleStyle: {
            color: '#fff',
            textAlign: 'center',
            flex: 1,
        },
        headerBackTitleStyle: {
            tintColor: '#fff',
            textDecorationColor: '#fff',
        },
headerTintColor: '#fff',
  })
});
