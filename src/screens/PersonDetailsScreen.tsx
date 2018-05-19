import React from 'react';
import { PersonDetailScreen, FilmographyScreen, PicturesScreen } from '../redux/TmdbReducer';
import { TabNavigator, TabNavigatorConfig, createBottomTabNavigator, createMaterialTopTabNavigator, NavigationRouteConfigMap } from 'react-navigation';
import { MaterialIcons, Entypo } from '@expo/vector-icons';
import { movieSomColor, movieSomSecondaryColor } from '../styles/Styles';
import { Platform } from 'react-native';

const navigationRouteConfigMap: NavigationRouteConfigMap = {
  DetailsScreen: {
    screen: PersonDetailScreen,
    navigationOptions: {
      title: 'Person Details',
      tabBarIcon: <MaterialIcons name="info-outline" size={32} color='#fff'/>,
    }
  },
  FilmographyScreen: {
    screen: FilmographyScreen,
    navigationOptions: {
      title: 'Filmography',
      tabBarIcon: <Entypo name="folder-video" size={32} color='#fff'/>,
    }
  },
  Pictures: {
    screen: PicturesScreen,
    navigationOptions: {
      title: 'Images',
      tabBarIcon: <Entypo name="folder-images" size={32} color='#fff'/>,
    }
  },
};

const tabNavigatorConfig: TabNavigatorConfig = {
  tabBarPosition: 'bottom',
  tabBarOptions: {
    style: {
        backgroundColor: movieSomColor,
    },
    activeTintColor: '#fff',
    inactiveTintColor: movieSomSecondaryColor,
    activeBackgroundColor: movieSomColor,
    inactiveBackgroundColor: movieSomColor,
    indicatorStyle: {
      backgroundColor: '#fff'
    },
  },
  backBehavior: 'none',
  navigationOptions: ({navigation}) => ({
    tabBarVisible: (navigation.state.params && navigation.state.params.hideTabBar) !== true,
    animationEnabled: true
  }),
};

let PersonDetailsTabNav;
if (Platform.OS === 'android') {
    PersonDetailsTabNav = createMaterialTopTabNavigator(navigationRouteConfigMap, tabNavigatorConfig);
} else {
    PersonDetailsTabNav = createBottomTabNavigator(navigationRouteConfigMap, tabNavigatorConfig);
}

export default PersonDetailsTabNav;
