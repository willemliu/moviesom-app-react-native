import React from 'react';
import {CastAndCrewScreen, EpisodesScreen, SeasonDetailScreen} from '../redux/TmdbReducer';
import { TabNavigatorConfig, createBottomTabNavigator, createMaterialTopTabNavigator, NavigationRouteConfigMap } from 'react-navigation';
import { MaterialIcons } from '@expo/vector-icons';
import { movieSomColor, movieSomSecondaryColor } from '../styles/Styles';
import { Platform } from 'react-native';

const navigationRouteConfigMap: NavigationRouteConfigMap = {
  DetailsScreen: {
    screen: SeasonDetailScreen,
    navigationOptions: {
      title: 'Season details',
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
  Episodes: {
    screen: EpisodesScreen,
    navigationOptions: {
      title: 'Episodes',
      tabBarIcon: <MaterialIcons name="format-list-numbered" size={32} color='#fff'/>,
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

let SeasonDetailsTabNav;
if (Platform.OS === 'android') {
    SeasonDetailsTabNav = createMaterialTopTabNavigator(navigationRouteConfigMap, tabNavigatorConfig);
} else {
    SeasonDetailsTabNav = createBottomTabNavigator(navigationRouteConfigMap, tabNavigatorConfig);
}

export default SeasonDetailsTabNav;
