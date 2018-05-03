import { YellowBox, Image, Text, View, AsyncStorage, Linking } from 'react-native';
import { StackNavigator, DrawerNavigator, TabNavigator } from 'react-navigation';
import AboutScreen from './src/screens/AboutScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import DrawerContainer from './src/components/DrawerContainer';
import FilmographyScreen from './src/screens/FilmographyScreen';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import PasswordResetScreen from './src/screens/PasswordResetScreen';
import React from 'react';
import SignUpScreen from './src/screens/SignUpScreen';
import {headerStyle} from "./src/styles/Styles";

// YellowBox.ignoreWarnings([
//   'Warning: componentWillMount is deprecated',
//   'Warning: componentWillReceiveProps is deprecated',
// ]);

export default class App extends React.Component<any> {
  render() {
    return (
      <StackNav/>
    );
  }
}

const DrawerNav = DrawerNavigator({
  Home: {
    screen: HomeScreen,
  },
}, {
  contentComponent: DrawerContainer,
  navigationOptions: ({navigation}) => ({
    headerStyle: {
      backgroundColor: '#008CBA',
    },
    headerLeft: (
      <Text onPress={async () => {
        navigation.navigate('DrawerToggle', {
          loggedIn: await AsyncStorage.getItem('loggedIn')
        });
        console.log('drawer loggedIn', await AsyncStorage.getItem('loggedIn') === '1');
      }}>Menu</Text>
    )
  })
});

const TabNav = TabNavigator({
    DetailsScreen: {
      screen: DetailsScreen,
      navigationOptions: {
        title: 'Details',
      }
    },
    FilmographyScreen: {
      screen: FilmographyScreen,
      navigationOptions: {
        title: 'Filmography',
      }
    },
    FilmographyScreen2: {
      screen: FilmographyScreen,
      navigationOptions: {
        title: 'Filmography2',
      }
    },
    FilmographyScreen3: {
      screen: FilmographyScreen,
      navigationOptions: {
        title: 'Filmography3',
      }
    }
}, {
    tabBarPosition: 'bottom',
    tabBarOptions: {
    style: {
        backgroundColor: '#008CBA',
    },
    activeTintColor: '#fff',
    activeBackgroundColor: '#008CBA',
    inactiveBackgroundColor: '#008CBA',
    indicatorStyle: {
      backgroundColor: '#fff'
    },
  },
  backBehavior: 'none',
});

const StackNav = StackNavigator({
    Drawer: {
      screen: DrawerNav,
    },
    About: {
      screen: AboutScreen,
    },
    Details: {
      screen: TabNav,
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
}, {
    navigationOptions: ({navigation}) => ({
      title: 'MovieSom',
      headerTitle: <View style={headerStyle.view}><Image style={headerStyle.image} resizeMode="center" resizeMethod="scale" source={require('./img/title.png')}/></View>,
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

const handleUrl = ({url}: any) => {
    alert(url);
    // alert(`Linked to app with path: ${path} and data: ${JSON.stringify(queryParams)}`);
};

Linking.addEventListener('url', handleUrl);

(async () => {
    try {
        const url = await Linking.getInitialURL();
        console.log('Initial URL', url);
        if (url) { handleUrl({url}); }
    } catch (e) {
        console.error(e);
    }
})();
