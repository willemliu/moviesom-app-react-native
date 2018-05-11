import { Image, Text, View, Modal, TouchableHighlight, Linking, AsyncStorage } from 'react-native';
import { StackNavigator } from 'react-navigation';
import AboutScreen from './src/screens/AboutScreen';
import { LoginScreen, SignUpScreen } from './src/redux/login/LoginReducer';
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

console.disableYellowBox = true;

export default class App extends React.Component<any> {

  state: any = {
    modalVisible: false,
  };

  constructor(props: any) {
      super(props);
      Linking.addEventListener('url', this.handleUrl);
      this.checkInitialUrl();
      getConfig();
      this.createStore();
  }

  createStore = async () => {
    const loggedIn = await AsyncStorage.getItem('loggedIn');
    const preloadedState = JSON.parse(await AsyncStorage.getItem('store'));
    let store: Store;
    if (preloadedState) {
      store = createStore(rootReducer, preloadedState);
      console.log('Load Redux store');
    } else {
      console.log('Create Redux store');
      store = createStore(rootReducer);
    }
    store.subscribe(async () => {
      await AsyncStorage.setItem('store', JSON.stringify(store.getState()));
    });
    if (loggedIn) {
      store.dispatch({type: LOGIN});
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
        {this.state.store ? <Provider store={this.state.store}>
          <StackNav/>
        </Provider> : null}
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
