import React from 'react';
import { TabNavigatorConfig, createBottomTabNavigator, createMaterialTopTabNavigator, NavigationRouteConfigMap } from 'react-navigation';
import { CastAndCrewScreen, MovieDetailScreen, NewsScreen } from '../redux/TmdbReducer';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { movieSomColor, movieSomSecondaryColor } from '../styles/Styles';
import { Platform } from 'react-native';

const navigationRouteConfigMap: NavigationRouteConfigMap = {
  DetailsScreen: {
    screen: MovieDetailScreen,
    navigationOptions: {
      title: 'Movie details',
      tabBarIcon: <MaterialIcons name="info-outline" size={32} color='#fff'/>,
    }
  },
  MovieNews: {
    screen: NewsScreen,
    navigationOptions: {
      title: 'News',
      tabBarIcon: <FontAwesome name="newspaper-o" size={32} color='#fff'/>,
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
  })
};

let MovieDetailsTabNav;
if (Platform.OS === 'android') {
    MovieDetailsTabNav = createMaterialTopTabNavigator(navigationRouteConfigMap, tabNavigatorConfig);
} else {
    MovieDetailsTabNav = createBottomTabNavigator(navigationRouteConfigMap, tabNavigatorConfig);
}

export default MovieDetailsTabNav;
