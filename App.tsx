import { Image, Text, View, Modal, Linking, AsyncStorage, NetInfo, ConnectionInfo, ConnectionType } from 'react-native';
import { StackNavigator } from 'react-navigation';
import AboutScreen from './src/screens/AboutScreen';
import { LoginScreen, SignUpScreen } from './src/redux/TmdbReducer';
import PasswordResetScreen from './src/screens/PasswordResetScreen';
import React from 'react';
import {headerStyle, viewStyle, textStyle} from "./src/styles/Styles";
import PersonDetailsScreen from './src/screens/PersonDetailsScreen';
import DrawerScreen from './src/screens/DrawerScreen';
import {getConfig} from './src/tmdb/TMDb';
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
    getConfig();
    this.createStore();
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

  createStore = async () => {
    const loggedIn = await AsyncStorage.getItem('loggedIn');
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
    if (loggedIn) {
      store.dispatch({type: LOGIN});
    }
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
                    <TouchTextButton
                        onPress={this.hideModal}>Close
                    </TouchTextButton>
                </View>
            </View>
        </Modal>
        {this.state.store ?
        <Provider store={this.state.store}>
          <StackNav/>
        </Provider> : null}
        {!this.state.online ? <Text style={{flex: 0, textAlign: 'center', backgroundColor: 'red', color: 'white'}}>{this.state.networkMessage}</Text> : <Text style={{flex: 0, textAlign: 'center', backgroundColor: 'green', color: 'white'}}>{this.state.networkMessage}</Text>}
        <KeyboardSpacer/>
      </View>
    );
  }
}

const StackNav = StackNavigator({
    Drawer: {
      screen: DrawerScreen,
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
    navigationOptions: ({navigation}) => ({
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
