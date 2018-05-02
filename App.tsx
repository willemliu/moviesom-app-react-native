import * as React from 'react';
import { YellowBox, StyleSheet, Button, Image, Text, View, ScrollView } from 'react-native';
import { StackNavigator, DrawerNavigator, TabNavigator, NavigationActions } from 'react-navigation';

YellowBox.ignoreWarnings([
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
]);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  header: {
    flex: 1,
    backgroundColor: '#008CBA',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  headerImage: {
    flex: 1,
  },
});

export class HomeScreen extends React.Component<any> {
  static navigationOptions = {
    title: 'Home',
    drawerIcon: () => (
      <Image
        source={{uri: `https://dummyimage.com/60x60/000/fff.jpg&text=1`}}
        style={{width: 30, height: 30, borderRadius: 15}}
      />
    ),
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.ts to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
        <Button onPress={() => this.props.navigation.navigate('About', {name: 'Willem Liu'})} title="About">About</Button>
        <Button onPress={() => this.props.navigation.navigate('Details', {depth: 0, name: 'Willem Liu'})} title="Details">Details</Button>
      </View>
    );
  }
}

export class AboutScreen extends React.Component<any> {
  static navigationOptions = {
    title: 'About',
    drawerIcon: () => (
      <Image
        source={{uri: `https://dummyimage.com/60x60/000/fff.jpg&text=2`}}
        style={{width: 30, height: 30, borderRadius: 15}}
      />
    ),
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>About {this.props.navigation.getParam('name')}.</Text>
      </View>
    );
  }
}

export class DetailsScreen extends React.Component<any> {
  static navigationOptions = {
    title: 'Details',
  };

  render() {
    return (
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text>Details</Text>
        <Text>Depth {this.props.navigation.getParam('depth')}.</Text>
        <Text>Details {this.props.navigation.getParam('name')}.</Text>
        <Button onPress={() => this.props.navigation.navigate('Details', {
          depth: this.props.navigation.getParam('depth') + 1,
          name: this.props.navigation.getParam('name')
        })} title="Details">Details</Button>

        <Text>1Open up App.ts to start working on your app!</Text>
        <Text>2Changes you make will automatically reload.</Text>
        <Text>3Shake your phone to open the developer menu.</Text>
        <Text>4Open up App.ts to start working on your app!</Text>
        <Text>5Changes you make will automatically reload.</Text>
        <Text>6Shake your phone to open the developer menu.</Text>
        <Text>7Open up App.ts to start working on your app!</Text>
        <Text>8Changes you make will automatically reload.</Text>
        <Text>9Shake your phone to open the developer menu.</Text>
        <Text>10Open up App.ts to start working on your app!</Text>
        <Text>11Changes you make will automatically reload.</Text>
        <Text>12Shake your phone to open the developer menu.</Text>
        <Text>13Open up App.ts to start working on your app!</Text>
        <Text>14Changes you make will automatically reload.</Text>
        <Text>15Shake your phone to open the developer menu.</Text>
        <Text>16Open up App.ts to start working on your app!</Text>
        <Text>17Changes you make will automatically reload.</Text>
        <Text>18Shake your phone to open the developer menu.</Text>
        <Text>19Open up App.ts to start working on your app!</Text>
        <Text>20Changes you make will automatically reload.</Text>
        <Text>21Shake your phone to open the developer menu.</Text>
        <Text>22Open up App.ts to start working on your app!</Text>
        <Text>23Changes you make will automatically reload.</Text>
        <Text>24Shake your phone to open the developer menu.</Text>
        <Text>25Open up App.ts to start working on your app!</Text>
        <Text>26Changes you make will automatically reload.</Text>
        <Text>27Shake your phone to open the developer menu.</Text>
        <Text>28Open up App.ts to start working on your app!</Text>
        <Text>29Changes you make will automatically reload.</Text>
        <Text>30Shake your phone to open the developer menu.</Text>

      </ScrollView>
    );
  }
}

export class FilmographyScreen extends React.Component<any> {
  static navigationOptions = {
    title: 'Filmography',
  };

  filmography = (params: any) => {
    const navigate = NavigationActions.navigate({
      routeName: 'Details',
      params,
      // action: NavigationActions.navigate({ routeName: 'FilmographyScreen', params })
    });
    this.props.navigation.dispatch(navigate);
  }

  render() {
    return (
      <ScrollView>
        <Text>Filmography</Text>
        <Text>Depth {this.props.navigation.getParam('depth')}.</Text>
        <Text>Filmography {this.props.navigation.getParam('name')}.</Text>
        <Button onPress={() => this.filmography({
            depth: this.props.navigation.getParam('depth') + 1,
            name: this.props.navigation.getParam('name')
          })
        } title="Filmography">Filmography</Button>

      </ScrollView>
    );
  }
}

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
  About: {
    screen: AboutScreen,
  },
}, {
  navigationOptions: ({navigation}) => ({
    headerStyle: {
      backgroundColor: '#008CBA',
    },
    headerLeft: (
      <Text onPress={() => navigation.navigate('DrawerToggle')}>Menu</Text>
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
    Details: {
        screen: TabNav,
    },
}, {
    navigationOptions: ({navigation}) => ({
        title: 'MovieSom',
        headerTitle: <View style={styles.header}><Image style={styles.headerImage} resizeMode="center" resizeMethod="scale" source={require('./img/title.png')}/></View>,
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
