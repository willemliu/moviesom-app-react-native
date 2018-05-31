import React from 'react';
import { TvDetailScreen, CastAndCrewScreen, SeasonsScreen, NewsScreen } from '../redux/TmdbReducer';
import { TabNavigatorConfig, createBottomTabNavigator, createMaterialTopTabNavigator, NavigationRouteConfigMap } from 'react-navigation';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { movieSomColor, movieSomSecondaryColor } from '../styles/Styles';
import { Platform } from 'react-native';

const navigationRouteConfigMap: NavigationRouteConfigMap = {
  DetailsScreen: {
    screen: TvDetailScreen,
    navigationOptions: {
      title: 'TV details',
      tabBarIcon: <MaterialIcons name="info-outline" size={32} color='#fff'/>,
    }
  },
  TvNews: {
    screen: NewsScreen,
    navigationOptions: {
      title: 'News',
      tabBarIcon: <FontAwesome name="newspaper-o" size={32} color='#fff'/>,
    }
  },
  Seasons: {
    screen: SeasonsScreen,
    navigationOptions: {
      title: 'Seasons',
      tabBarIcon: <MaterialIcons name="format-list-numbered" size={32} color='#fff'/>,
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

let TvDetailsTabNav;
if (Platform.OS === 'android') {
    TvDetailsTabNav = createMaterialTopTabNavigator(navigationRouteConfigMap, tabNavigatorConfig);
} else {
    TvDetailsTabNav = createBottomTabNavigator(navigationRouteConfigMap, tabNavigatorConfig);
}

export default TvDetailsTabNav;
