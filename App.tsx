import { Image, Text, View, Modal, Linking, AsyncStorage, NetInfo, ConnectionInfo } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import AboutScreen from './src/screens/AboutScreen';
import {LoginScreen, SignUpScreen, RecommendScreen, CollectionFilterScreen, ProfileScreen} from './src/redux/TmdbReducer';
import PasswordResetScreen from './src/screens/PasswordResetScreen';
import React from 'react';
import {headerStyle, viewStyle} from "./src/styles/Styles";
import PersonDetailsNav from './src/screens/PersonDetailsNav';
import {getConfig as getTmdbConfig} from './src/tmdb/TMDb';
import {getConfig as getMovieSomConfig, loginWithToken} from './src/moviesom/MovieSom';
import MovieDetailsNav from './src/screens/MovieDetailsNav';
import TvDetailsNav from './src/screens/TvDetailsNav';
import TouchTextButton from './src/components/TouchTextButton';
import { createStore, Store } from 'redux';
import {Provider} from "react-redux";
import { rootReducer } from './src/redux/rootReducer';
import WebScreen from './src/screens/WebScreen';
import { LOGIN, LOGOUT } from './src/redux/login/LoginActions';
import { DEVICE_ONLINE } from './src/redux/device/DeviceActions';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import HomeNav from './src/screens/HomeNav';
import SeasonDetailsNav from './src/screens/SeasonDetailsNav';
import EpisodeDetailsNav from './src/screens/EpisodeDetailsNav';

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
    }

    componentDidMount() {
        this.createStore().catch((e: any) => console.log(e));
    }

    getConfig = async () => {
        await getTmdbConfig();
        await getMovieSomConfig();
    }

    netInfo = () => {
        NetInfo.addEventListener('connectionChange', this.checkOnline as any);
    }

    checkOnline = (connectionInfo: ConnectionInfo) => {
        const type = connectionInfo ? connectionInfo.type : 'none';
        switch (type) {
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
                    networkMessage: `Online ${connectionInfo.effectiveType}`
                });
                return true;
        }
    }

    checkLoggedIn = async (store: Store) => {
        const loggedIn = await AsyncStorage.getItem('loggedIn');
        const loginToken = await AsyncStorage.getItem('loginToken');
        if (loggedIn) {
            console.log('Initial token', loginToken);
            const loginResult = await loginWithToken(loginToken);
            if (loginResult.login.status === 200) {
                console.log('New token', loginResult.login.loginToken);
                store.dispatch({type: LOGIN, loginToken: loginResult.login.loginToken});
            } else {
                store.dispatch({type: LOGOUT});
            }
        }
        return loggedIn;
    }

    createStore = async () => {
        // Always reset the store if not reset before a specified date.
        const baselineTimestamp = +new Date('2018-06-06');
        const lastResetTimestamp = await AsyncStorage.getItem('lastResetTimestamp');
        if (baselineTimestamp > parseInt(lastResetTimestamp, 10)) {
            await AsyncStorage.removeItem('store');
            AsyncStorage.setItem('lastResetTimestamp', `${+new Date()}`);
        }
        const preloadedState = JSON.parse(await AsyncStorage.getItem('store'));
        let store: Store;
        if (preloadedState && await AsyncStorage.getItem('loggedIn')) {
            console.log('Load Redux store');
            store = createStore(rootReducer, preloadedState);
        } else {
            console.log('Create Redux store');
            store = createStore(rootReducer);
        }
        if (this.checkOnline(await NetInfo.getConnectionInfo())) {
            store.dispatch({type: DEVICE_ONLINE});
            await this.checkLoggedIn(store);
        }
        /**
         * Subscribe to store changes and save them locally on the device for
         * future sessions. Only save when following conditions are met:
         * - Logged in
         * - Online
         */
        store.subscribe(async () => {
            if (await AsyncStorage.getItem('loggedIn')
                && this.checkOnline(await NetInfo.getConnectionInfo())) {
                await AsyncStorage.setItem('store', JSON.stringify(store.getState()));
            }
        });
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
                {!this.state.online ? <Text style={{flex: 0, textAlign: 'center', backgroundColor: 'red', color: 'white'}}>{this.state.networkMessage}</Text> : null}
                <KeyboardSpacer/>
            </View>
        );
    }
}

const StackNav = createStackNavigator({
    Home: {
        screen: HomeNav,
    },
    About: {
        screen: AboutScreen,
    },
    MovieDetails: {
        screen: MovieDetailsNav,
    },
    TvDetails: {
        screen: TvDetailsNav,
    },
    SeasonDetails: {
        screen: SeasonDetailsNav,
    },
    EpisodeDetails: {
        screen: EpisodeDetailsNav,
    },
    PersonDetails: {
        screen: PersonDetailsNav,
    },
    CollectionFilter: {
        screen: CollectionFilterScreen,
    },
    Recommend: {
        screen: RecommendScreen,
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
    Profile: {
        screen: ProfileScreen,
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
