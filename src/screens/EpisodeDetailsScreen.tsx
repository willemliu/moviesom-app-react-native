import React from 'react';
import {CastAndCrewScreen, EpisodeDetailScreen} from '../redux/TmdbReducer';
import { TabNavigatorConfig, createBottomTabNavigator, createMaterialTopTabNavigator, NavigationRouteConfigMap } from 'react-navigation';
import { MaterialIcons } from '@expo/vector-icons';
import { movieSomColor, movieSomSecondaryColor } from '../styles/Styles';
import { Platform } from 'react-native';

const navigationRouteConfigMap: NavigationRouteConfigMap = {
  DetailsScreen: {
    screen: EpisodeDetailScreen,
    navigationOptions: {
      title: 'Episode details',
      tabBarIcon: <MaterialIcons name="info-outline" size={32} color='#fff'/>,
    }
  },
  CastAndCrew: {
    screen: CastAndCrewScreen,
    navigationOptions: {
      title: 'Cast & Crew',
      tabBarIcon: <MaterialIcons name="people-outline" size={32} color='#fff'/>,
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
  navigationOptions: ({navigation}) => ({
    tabBarVisible: (navigation.state.params && navigation.state.params.hideTabBar) !== true,
    animationEnabled: true
  }),
};

let EpisodeDetailsTabNav;
if (Platform.OS === 'android') {
    EpisodeDetailsTabNav = createMaterialTopTabNavigator(navigationRouteConfigMap, tabNavigatorConfig);
} else {
    EpisodeDetailsTabNav = createBottomTabNavigator(navigationRouteConfigMap, tabNavigatorConfig);
}

export default EpisodeDetailsTabNav;
